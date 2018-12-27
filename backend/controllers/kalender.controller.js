var sequelize = require(__dirname + '/../dbconnection');
var jadwalTambahans = sequelize.import(__dirname + '/../models/jadwalTambahan.model');
var mahasiswas = sequelize.import(__dirname + '/../models/mahasiswa.model');
var mataKuliahs = sequelize.import(__dirname + '/../models/mataKuliah.model');
var pengajars = sequelize.import(__dirname + '/../models/pengajar.model');
var jadwalKuliahs = sequelize.import(__dirname + '/../models/jadwalKuliah.model');
var pesertaKuliahs = sequelize.import(__dirname + '/../models/pesertaKuliah.model');
var deadlineTugass = sequelize.import(__dirname + '/../models/deadlineTugas.model');
var token = require(__dirname + '/token.controller');

pengajars.belongsTo(jadwalKuliahs, {foreignKey: 'fk_id_jadwal_kuliah'});
deadlineTugass.belongsTo(pengajars, {foreignKey: 'fk_id_pengajar'});
jadwalKuliahs.belongsTo(mataKuliahs, {foreignKey: 'fk_id_mata_kuliah'});

class Kalender {
    constructor() {
        this.info;
    }

    async getMyKalender(req, res){ //dengan param tahun dan bulan
        try {
            this.info = await token.DecodeToken(req.headers.token);
            if(this.info != null){

                //get peserta kuliah untuk mendapatkan user terdaftar di matkul apa saja
                var mahasiswa = await mahasiswas.findOne({ //buat dapetin id_mahasiswa
                    where: {
                        fk_id_user : this.info.token.id
                    }
                })

                var pesertaKuliah = await pesertaKuliahs.findAll({ //dapetin terdaftar di matkul apa saja
                    where: {
                        fk_id_mahasiswa: mahasiswa.id
                    }
                })

                //var jadwal Ujian
                var arrIdMataKuliah = await []
                var jadwalKuliah
                var jadwalUjian

                //var deadline Tugas
                var arrIdJadwalKuliah = await []
                var deadlineTugas

                for(var i = 0; i<pesertaKuliah.length;i++){
                    jadwalKuliah = await jadwalKuliahs.findOne({ //cari jadwal kuliah dari peserta kuliah
                        where: {
                            id: pesertaKuliah[i].fk_id_jadwal_kuliah
                        },
                        include: [{
                            model: mataKuliahs
                        }]
                    })

                    arrIdMataKuliah.push(jadwalKuliah.mata_kuliah.id) //yang diambil hanya id mata kuliah
                    arrIdJadwalKuliah.push(pesertaKuliah[i].fk_id_jadwal_kuliah) //yang diambil hanya id jadwal kuliah
                }

                //get jadwal Ujian
                jadwalUjian = await jadwalUjians.findAll({ //cari berdasarkan seluruh id matakuliah terurut berdasarkan waktu mulai
                    where: {
                        fk_id_mata_kuliah: {
                            [Op.in]: arrIdMataKuliah
                        },
                        waktu_mulai: {
                            [Op.gte]: new Date(req.params.tahun, req.params.bulan, 1), //month pake int
                            [Op.lte]: new Date(req.params.tahun, req.params.bulan + 1, 1) //year pake int
                        }
                    },
                    include: [{
                        model: mataKuliahs
                    }],
                    order: [
                        ['waktu_mulai', 'ASC']
                    ]
                })

                //get deadline Tugas
                deadlineTugas = await deadlineTugass.findAll({ //cari berdasarkan seluruh id matakuliah terurut berdasarkan waktu mulai
                    where: {
                        '$pengajar.fk_id_jadwal_kuliah': {
                            [Op.in]: arrIdJadwalKuliah
                        },
                        batas_pengumpulan: {
                            [Op.gte]: new Date(req.params.tahun, req.params.bulan, 1), //month pake int
                            [Op.lte]: new Date(req.params.tahun, req.params.bulan + 1, 1) //year pake int
                        }
                    },
                    include: [{
                        model: pengajars,
                        include: [{
                            model: jadwalKuliahs,
                            include: [{
                                model: mataKuliahs
                            }]
                        }]
                    }],
                    order: [
                        ['batas_pengumpulan', 'ASC']
                    ]
                })

                //get jadwal Tambahan
                var jadwalTambahan = await jadwalTambahans.findAll({ 
                    where: {
                        fk_id_user : this.info.token.id,
                        tanggal: {
                            [Op.gte]: new Date(req.params.tahun, req.params.bulan, 1), //month pake int
                            [Op.lte]: new Date(req.params.tahun, req.params.bulan + 1, 1) //year pake int
                        }
                    },
                    order: [
                        ['tanggal', 'ASC']
                    ]
                })

                res.json({
                    status: true,
                    message: "berhasil mendapatkan event pada kalender saya",
                    data : jadwalTambahan
                })

            } else {
                res.json({
                    status: false,
                    message: "belum login (tidak memiliki token)"
                })
            }
        } catch(err){
            res.json({
                status:false,
                message: "error occurred",
                data: err
            })
        }
    }

}

module.exports = new Kalender;