var sequelize = require(__dirname + '/../dbconnection');
var deadlineTugas = sequelize.import(__dirname + '/../models/deadlineTugas.model');
var departemen = sequelize.import(__dirname + '/../models/departemen.model');
var dosen = sequelize.import(__dirname + '/../models/dosen.model');
var fakultas = sequelize.import(__dirname + '/../models/fakultas.model');
var jadwalKuliah = sequelize.import(__dirname + '/../models/jadwalKuliah.model');
var jadwalUjian = sequelize.import(__dirname + '/../models/jadwalUjian.model');
var jadwalTambahan = sequelize.import(__dirname + '/../models/jadwalTambahan.model');
var mahasiswa = sequelize.import(__dirname + '/../models/mahasiswa.model');
var mataKuliah = sequelize.import(__dirname + '/../models/mataKuliah.model');
var pengajar = sequelize.import(__dirname + '/../models/pengajar.model');
var pesertaKuliah = sequelize.import(__dirname + '/../models/pesertaKuliah.model');
var ruangan = sequelize.import(__dirname + '/../models/ruangan.model');
var tataUsaha = sequelize.import(__dirname + '/../models/tataUsaha.model');
var user = sequelize.import(__dirname + '/../models/user.model');
var hari = sequelize.import(__dirname + '/../models/hari.model');

fakultas
    .sync()
    .then(() => {
        departemen
            .sync()
            .then(() => {
                user
                    .sync()
                    .then(() => {
                        mahasiswa
                            .sync()
                            .then(() => {
                                tataUsaha
                                    .sync()
                                dosen
                                    .sync()
                                    .then(() => {
                                        mataKuliah
                                            .sync()
                                            .then(() => {
                                                ruangan
                                                    .sync().then(()=>{
                                                        hari.sync()
                                                        .then(()=> {
                                                            jadwalKuliah
                                                            .sync()
                                                            .then(() => {
                                                                pengajar
                                                                    .sync()
                                                                    .then(() => {
                                                                        jadwalUjian
                                                                            .sync()
                                                                    })
                                                                pesertaKuliah
                                                                    .sync()
                                                                    .then(() => {
                                                                        deadlineTugas
                                                                            .sync()
                                                                            .then(() => {
                                                                                jadwalTambahan
                                                                                    .sync()
                                                                            })
                                                                    })
                                                            })
                                                        }) 
                                                        
                                                    })
                                            })
                                        
                                    })
                            })
                    })
            })
    })
