var sequelize = require(__dirname + '/../dbconnection');

module.exports = function(sequelize, DataType) {
	return sequelize.define('hari', {
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