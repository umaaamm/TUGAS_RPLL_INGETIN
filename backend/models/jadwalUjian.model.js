var sequelize = require(__dirname + '/../dbconnection');
var mataKuliah = sequelize.import(__dirname + '/mataKuliah.model');
var ruangan = sequelize.import(__dirname + '/ruangan.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('jadwal_ujian', {
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
		waktu_mulai: DataType.DATE,
		waktu_selesai: DataType.DATE
	},{
		timestamps: false
    });
}