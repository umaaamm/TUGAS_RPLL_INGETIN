var sequelize = require(__dirname + '/../dbconnection');

module.exports = function(sequelize, DataType) {
	return sequelize.define('fakultas', {
        nama: DataType.STRING
	});
}