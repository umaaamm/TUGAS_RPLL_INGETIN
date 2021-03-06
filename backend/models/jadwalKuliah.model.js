var sequelize = require(__dirname + '/../dbconnection');
var mahasiswa = sequelize.import(__dirname + '/mahasiswa.model');
var mataKuliah = sequelize.import(__dirname + '/mataKuliah.model');
var ruangan = sequelize.import(__dirname + '/ruangan.model');
var hari = sequelize.import(__dirname + '/hari.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('jadwal_kuliah', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		id_komti: { //fk_id_mahasiswa
			type: DataType.INTEGER,
			references: {
				model: mahasiswa,
				key: 'id'
			}
		},
		fk_id_mata_kuliah: { 
			type: DataType.INTEGER,
			references: {
				model: mataKuliah,
				key: 'id'
			}
		},
		fk_id_ruangan: {
			type: DataType.INTEGER,
			references: {
				model: ruangan,
				key: 'id'
			}
		},
		fk_id_hari: { //1 Senin 2 Selasa dst...
			type: DataType.INTEGER,
			references: {
				model: hari,
				key: 'id'
			}
		}, 
		waktu_mulai: DataType.TIME,
		waktu_selesai: DataType.TIME
	},{
		timestamps: false
    });
}