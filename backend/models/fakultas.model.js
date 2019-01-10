var sequelize = require(__dirname + '/../dbconnection');

module.exports = function(sequelize, DataType) {
	return sequelize.define('fakultas', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama: DataType.STRING
	},{
		timestamps: false
    });
}