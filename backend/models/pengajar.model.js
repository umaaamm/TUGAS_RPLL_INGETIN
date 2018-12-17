var sequelize = require(__dirname + '/../dbconnection');
var dosen = sequelize.import(__dirname + '/dosen.model');
var jadwalKuliah = sequelize.import(__dirname + '/jadwalKuliah.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('pengajar', {
		fk_id_dosen: { 
			type: DataType.INTEGER,
			references: {
				model: dosen,
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