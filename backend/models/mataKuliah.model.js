var sequelize = require(__dirname + '/../dbconnection');
var dosen = sequelize.import(__dirname + '/dosen.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('mata_kuliah', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		nama: DataType.STRING,
		kode: DataType.STRING, //kode matkul
		id_koordinator: { //fk_id_dosen
			type: DataType.INTEGER,
			references: {
				model: dosen,
				key: 'id'
			}
		},
		semester: DataType.INTEGER,
		jumlah_SKS: DataType.STRING
	},{
		timestamps: false
    });
}