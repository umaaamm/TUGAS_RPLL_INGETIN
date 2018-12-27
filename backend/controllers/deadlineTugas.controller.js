var sequelize = require(__dirname + '/../dbconnection');
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

class DeadlineTugas {
    constructor() {
        this.info;
    }

    async getMyDeadlineTugas(req, res){ 
        try {
            this.info = await token.DecodeToken(req.headers.token);
            if(this.info != null){
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

                var arrIdJadwalKuliah = await []
                var deadlineTugas
                for(var i = 0; i<pesertaKuliah.length;i++){
                    arrIdJadwalKuliah.push(pesertaKuliah[i].fk_id_jadwal_kuliah) //yang diambil hanya id jadwal kuliah
                }

                deadlineTugas = await deadlineTugass.findAll({ //cari berdasarkan seluruh id matakuliah terurut berdasarkan waktu mulai
                    where: {
                        '$pengajar.fk_id_jadwal_kuliah': {
                            [Op.in]: arrIdJadwalKuliah
                        },
                        batas_pengumpulan: {
                            [Op.gte]: new Date(Date.now())
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

                res.json({
                    status: true,
                    message: "berhasil mendapatkan deadline tugas saya",
                    data : deadlineTugas
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

    async getMyDeadlineTugasByIdMataKuliah(req, res){ 
        try {
            this.info = await token.DecodeToken(req.headers.token);
            if(this.info != null){
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

                var arrIdJadwalKuliah = await []
                var deadlineTugas
                for(var i = 0; i<pesertaKuliah.length;i++){
                    arrIdJadwalKuliah.push(pesertaKuliah[i].fk_id_jadwal_kuliah) //yang diambil hanya id jadwal kuliah
                }

                var jadwalKuliah = await jadwalKuliahs.findAll({
                    where: {
                        fk_id_mata_kuliah: req.params.id,
                        id: {
                            [Op.in]: arrIdJadwalKuliah
                        }
                    }
                })

                var arrIdJadwal = await []
                for(var i = 0; i<jadwalKuliah.length;i++){
                    arrIdJadwal.push(jadwalKuliah[i].id) //yang diambil hanya id jadwal kuliah
                }

                deadlineTugas = await deadlineTugass.findAll({ //cari berdasarkan seluruh id matakuliah terurut berdasarkan waktu mulai
                    where: {
                        '$pengajar.fk_id_jadwal_kuliah': {
                            [Op.in]: arrIdJadwal
                        },
                        batas_pengumpulan: {
                            [Op.gte]: new Date(Date.now())
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

                res.json({
                    status: true,
                    message: "berhasil mendapatkan deadline tugas saya",
                    data : deadlineTugas
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

module.exports = new DeadlineTugas;