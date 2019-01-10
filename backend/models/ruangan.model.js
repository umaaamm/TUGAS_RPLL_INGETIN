var sequelize = require(__dirname + '/../dbconnection');
var dosen = sequelize.import(__dirname + '/dosen.model'); //belum bikin

module.exports = function(sequelize, DataType) {
	return sequelize.define('ruangan', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		nama: DataType.STRING,
		kelengkapan: DataType.STRING
	},{
		timestamps: false
    });
}