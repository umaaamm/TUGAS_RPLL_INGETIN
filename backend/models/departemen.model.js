var sequelize = require(__dirname + '/../dbconnection');
var fakultas = sequelize.import(__dirname + '/fakultas.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('departemen', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		nama: DataType.STRING,
		fk_id_fakultas: {
			type: DataType.INTEGER,
			references: {
				model: fakultas,
				key: 'id'
			}
		}
	},{
		timestamps: false
    });
}