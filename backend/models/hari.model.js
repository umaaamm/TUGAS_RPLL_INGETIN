var sequelize = require(__dirname + '/../dbconnection');

module.exports = function(sequelize, DataType) {
	return sequelize.define('hari', {
		nama: DataType.STRING
	},{
		timestamps: false
    });
}