var sequelize = require(__dirname + '/../dbconnection');
var dosen = sequelize.import(__dirname + '/dosen.model'); //belum bikin

module.exports = function(sequelize, DataType) {
	return sequelize.define('matakuliah', {
        nama: DataType.STRING,
        kode: DataType.STRING, //kode matkul
        id_koordinator: { //fk_id_dosen
        	type: DataType.INTEGER,
        	references: {
        		model: dosen,
        		key: 'id'
        	}
        },
        semester: DataType.INTEGER
	});
}