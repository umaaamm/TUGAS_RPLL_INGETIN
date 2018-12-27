var sequelize = require(__dirname + '/../dbconnection');
var mahasiswas = sequelize.import(__dirname + '/../models/mahasiswa.model');
var users = sequelize.import(__dirname + '/../models/user.model');
var departemens = sequelize.import(__dirname + '/../models/departemen.model');
var fakultass = sequelize.import(__dirname + '/../models/fakultas.model');
var token = require(__dirname + '/token.controller');

departemens.belongsTo(fakultass, {foreignKey: 'fk_id_fakultas'});
users.belongsTo(departemens, {foreignKey: 'fk_id_departemen'});
mahasiswas.belongsTo(users, {foreignKey: 'fk_id_user'});

class Mahasiswa {
    constructor() {
        this.info;
    }

    async getMyProfile(req, res){ 
        try {
            this.info = await token.DecodeToken(req.headers.token);
            if(this.info != null){
                var mahasiswa = await mahasiswas.findOne({ //buat dapetin id_mahasiswa
                    where: {
                        fk_id_user : this.info.token.id
                    },
                    include: [{
                        model: users,
                        include: [{
                            model: departemens,
                            include: [{
                                model: fakultass
                            }]
                        }]
                    }]
                })

                res.json({
                    status: true,
                    message: "berhasil mendapatkan profile saya",
                    data : mahasiswa
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

module.exports = new Mahasiswa;