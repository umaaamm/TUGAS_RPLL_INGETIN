var sequelize = require(__dirname + '/../dbconnection');
var mahasiswa = sequelize.import(__dirname + '/mahasiswa.model'); //belum bikin
var jadwalKuliah = sequelize.import(__dirname + '/jadwalKuliah.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('peserta_kuliah', {
		fk_id_mahasiswa: { 
			type: DataType.INTEGER,
			references: {
				model: mahasiswa,
				key: 'id'
			}
		},
		fk_id_jadwal_kuliah: { 
			type: DataType.INTEGER,
			references: {
				model: jadwalKuliah,
				key: 'id'
			}
		}
	},{
		timestamps: false
    });
}