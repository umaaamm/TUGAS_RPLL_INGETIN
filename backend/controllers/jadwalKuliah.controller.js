var sequelize = require(__dirname + '/../dbconnection');
var mahasiswas = sequelize.import(__dirname + '/../models/mahasiswa.model');
var mataKuliahs = sequelize.import(__dirname + '/../models/mataKuliah.model');
var jadwalKuliahs = sequelize.import(__dirname + '/../models/jadwalKuliah.model');
var pesertaKuliahs = sequelize.import(__dirname + '/../models/pesertaKuliah.model');
var token = require(__dirname + '/token.controller');

jadwalKuliahs.belongsTo(mataKuliahs, {foreignKey: 'fk_id_mata_kuliah'});

class JadwalKuliah {
    constructor() {
        this.info;
    }

    async getMyJadwalKuliah(req, res){ 
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
                var jadwalKuliah

                for(var i = 0; i<pesertaKuliah.length;i++){
                   arrIdJadwalKuliah.push(pesertaKuliah[i].fk_id_jadwal_kuliah)
                }

                jadwalKuliah = await jadwalKuliahs.findAll({ //cari jadwal kuliah dari seluruh id Jadwal Kuliah terurut berdasarkan hari dan jamnya
                    where: {
                        id: {
                            [Op.in]: arrIdJadwalKuliah
                        }
                    },
                    include: [{
                        model: mataKuliahs
                    }],
                    order: [
                        ['fk_id_hari', 'ASC'],
                        ['waktu_mulai', 'ASC']
                    ]
                })

                res.json({
                    status: true,
                    message: "berhasil mendapatkan jadwal kuliah saya",
                    data : jadwalKuliah 
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

module.exports = new JadwalKuliah;