var sequelize = require(__dirname + '/../dbconnection');
var mahasiswas = sequelize.import(__dirname + '/../models/mahasiswa.model');
var mataKuliahs = sequelize.import(__dirname + '/../models/mataKuliah.model');
var jadwalKuliahs = sequelize.import(__dirname + '/../models/jadwalKuliah.model');
var pesertaKuliahs = sequelize.import(__dirname + '/../models/pesertaKuliah.model');
var token = require(__dirname + '/token.controller');

jadwalKuliahs.belongsTo(mataKuliahs, {foreignKey: 'fk_id_mata_kuliah'});

class MataKuliah {
    constructor() {
        this.info;
    }

    async getMyMataKuliah(req, res){ 
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

                var objMatkul = await []
                var jadwalKuliah
                for(var i = 0; i<pesertaKuliah.length;i++){
                    jadwalKuliah = await jadwalKuliahs.findOne({ //cari matkul dari peserta kuliah
                        where: {
                            id: pesertaKuliah[i].fk_id_jadwal_kuliah
                        },
                        include: [{
                            model: mataKuliahs
                        }]
                    })

                    objMatkul.push(jadwalKuliah.mata_kuliah) //push objek matkul to array
                }

                res.json({
                    status: true,
                    message: "berhasil mendapatkan mata kuliah saya",
                    data : objMatkul //dalam bentuk array yang berisi object
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

module.exports = new MataKuliah;