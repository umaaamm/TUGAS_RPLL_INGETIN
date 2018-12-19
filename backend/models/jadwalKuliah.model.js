var sequelize = require(__dirname + '/../dbconnection');
var mahasiswa = sequelize.import(__dirname + '/mahasiswa.model');
var mataKuliah = sequelize.import(__dirname + '/mataKuliah.model');
var ruangan = sequelize.import(__dirname + '/ruangan.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('jadwal_kuliah', {
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
		hari: DataType.STRING,
		waktu_mulai: DataType.TIME,
		waktu_selesai: DataType.TIME
	},{
		timestamps: false
    });
}