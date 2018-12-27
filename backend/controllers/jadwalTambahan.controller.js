var sequelize = require(__dirname + '/../dbconnection');
var jadwalTambahans = sequelize.import(__dirname + '/../models/jadwalTambahan.model');
var token = require(__dirname + '/token.controller');

class JadwalTambahan {
    constructor() {
        this.info;
    }

    async getMyJadwalTambahan(req, res){ 
        try {
            this.info = await token.DecodeToken(req.headers.token);
            if(this.info != null){
                var jadwalTambahan = await jadwalTambahans.findAll({ 
                    where: {
                        fk_id_user : this.info.token.id,
                        tanggal: {
                            [Op.gte]: new Date(Date.now())
                        }
                    },
                    order: [
                        ['tanggal', 'ASC']
                    ]
                })

                res.json({
                    status: true,
                    message: "berhasil mendapatkan jadwal tambahan saya",
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

module.exports = new JadwalTambahan;