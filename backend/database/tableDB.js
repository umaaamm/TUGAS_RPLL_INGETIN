var sequelize = require(__dirname + '/../dbconnection');
var deadlineTugas = sequelize.import(__dirname + '/../model/deadlineTugas.model');
var departemen = sequelize.import(__dirname + '/../model/departemen.model');
var dosen = sequelize.import(__dirname + '/../model/dosen.model');
var fakultas = sequelize.import(__dirname + '/../model/fakultas.model');
var jadwalKuliah = sequelize.import(__dirname + '/../model/jadwalKuliah.model');
var jadwalUjian = sequelize.import(__dirname + '/../model/jadwalUjian.model');
var mahasiswa = sequelize.import(__dirname + '/../model/mahasiswa.model');
var mataKuliah = sequelize.import(__dirname + '/../model/mataKuliah.model');
var pengajar = sequelize.import(__dirname + '/../model/pengajar.model');
var pesertaKuliah = sequelize.import(__dirname + '/../model/pesertaKuliah.model');
var ruangan = sequelize.import(__dirname + '/../model/ruangan.model');
var tataUsaha = sequelize.import(__dirname + '/../model/tataUsaha.model');
var user = sequelize.import(__dirname + '/../model/user.model');

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
                                        pengajar
                                            .sync()
                                            .then(() => {
                                                mataKuliah
                                                    .sync()
                                            })
                                        ruangan
                                            .sync()
                                            .then(() => {
                                                jadwalKuliah
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
                                        
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
