var sequelize = require(__dirname + '/../dbconnection');
var dosen = sequelize.import(__dirname + '/dosen.model'); //belum bikin

module.exports = function(sequelize, DataType) {
	return sequelize.define('ruangan', {
		nama: DataType.STRING,
		kelengkapan: DataType.STRING
	},{
		timestamps: false
    });
}