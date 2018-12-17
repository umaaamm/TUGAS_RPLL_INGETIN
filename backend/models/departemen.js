var sequelize = require(__dirname + '/../dbconnection');
var departemen = sequelize.import(__dirname + '/departemen.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('departemen', {
		nama: DataType.STRING,
		fk_id_fakultas: {
			type: DataType.INTEGER,
			references: {
				model: departemen,
				key: 'id'
			}
		}
	});
}