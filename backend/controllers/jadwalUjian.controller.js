var sequelize = require(__dirname + '/../dbconnection');
var mahasiswas = sequelize.import(__dirname + '/../models/mahasiswa.model');
var mataKuliahs = sequelize.import(__dirname + '/../models/mataKuliah.model');
var jadwalUjians = sequelize.import(__dirname + '/../models/jadwalUjian.model');
var jadwalKuliahs = sequelize.import(__dirname + '/../models/jadwalKuliah.model');
var pesertaKuliahs = sequelize.import(__dirname + '/../models/pesertaKuliah.model');
var token = require(__dirname + '/token.controller');

jadwalUjians.belongsTo(mataKuliahs, {foreignKey: 'fk_id_mata_kuliah'});
jadwalKuliahs.belongsTo(mataKuliahs, {foreignKey: 'fk_id_mata_kuliah'});

class JadwalUjian {
    constructor() {
        this.info;
    }

    async getMyJadwalUjian(req, res){ 
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

                var arrIdMataKuliah = await []
                var jadwalKuliah
                var jadwalUjian
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
                }

                jadwalUjian = await jadwalUjians.findAll({ //cari berdasarkan seluruh id matakuliah terurut berdasarkan waktu mulai
                    where: {
                        fk_id_mata_kuliah: {
                            [Op.in]: arrIdMataKuliah
                        },
                        waktu_mulai: {
                            [Op.gte]: new Date(Date.now())
                        }
                    },
                    include: [{
                        model: mataKuliahs
                    }],
                    order: [
                        ['waktu_mulai', 'ASC']
                    ]
                })

                res.json({
                    status: true,
                    message: "berhasil mendapatkan jadwal ujian saya",
                    data : jadwalUjian
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

module.exports = new JadwalUjian;