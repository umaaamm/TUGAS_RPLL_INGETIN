var sequelize = require(__dirname + '/../dbconnection');
var users = sequelize.import(__dirname + '/../models/user.model');
var auth = require(__dirname + '/auth.controller');
var token = require(__dirname + '/token.controller');


class User {
    constructor() {
    }

    async createUser(req, res){ //1 mahasiswa, 2 dosen, 3 TU 
        try {
            var user = await users.findOne({ //pengecekan username
                where:{
                    username: req.body.username
                }
            })
            if(user != null){
                res.json({
                    status:false,
                    message: "username sudah digunakan"
                })
            } else {
                user = await users.create({
                    username: req.body.username,
                    password: auth.setPassword(req.body.password),
                    nama: req.body.nama,
                    jenis_kelamin: req.body.jenis_kelamin,
                    tempat_lahir: req.body.tempat_lahir,
                    alamat: req.body.alamat,
                    fk_id_departemen: req.body.id_departemen
                })
                res.json({
                    status: true,
                    message: "berhasil membuat user"
                })    
            }
        } catch(err){
            res.json({
                status:false,
                message: "gagal membuat user"
            })
        }
    }

    updatePassword(req, res){
        users.update({
            password: setPassword(req.body.password)
        }).then(result=>{
            res.json({
                status: true,
                message: "update password berhasil"
            })
        }).catch(err =>{
            res.json({
                status: false,
                message: "update password gagal",
                data: err
            })
        })
    }

    getAllUser(req,res){
        users.findAll()
            .then((result)=>{
                result = JSON.parse(JSON.stringify(result))
                res.json({
                    status:true,
                    message: "berhasil mendapatkan seluruh user",
                    data: result
                })
            })
    }

    getUserById(req,res){
        users.findById(req.params.id)
            .then((result)=>{
                result = JSON.parse(JSON.stringify(result))
                res.json({
                    status:true,
                    message: "berhasil mendapatkan seluruh user",
                    data: result
                })
            })
    }

    deleteUserById(req,res){ //belum di convert to string
        users.destroy({
            where: {
                id: req.params.id
            }
        }).then(result =>{
            res.json({
                status:true,
                message:"berhasil delete user id: " + String(req.params.id)
            })
        }).catch(err =>{
            res.json({
                status: false,
                message: "gagal delete user id: " + String(req.params.id)
            })
        })
    }

    async login(req, res){
        try{
            var user = await users.findOne({
                where: {
                    username: req.body.username
                }
            })
            user = JSON.parse(JSON.stringify(user))
            if(user == null){
                res.json({
                    status: false,
                    message: "username tidak ditemukan"
                })
            } else {
                if(auth.comparePassword(req.body.password, user.password)){
                    auth.token = token.setupToken(user, "mahasiswa")
                    res.json({
                        status: true,
                        message: "Auth successfull",
                        token: auth.token
                    })
                } else {
                    res.json({
                        status: false,
                        message: "password tidak cocok"
                    })
                }
            }
        } catch(err){
            res.json({
                status: false,
                message: "error on access DB",
                data: err
            })
        }
    }
}

module.exports = new User;