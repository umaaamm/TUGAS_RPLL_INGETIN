var sequelize = require(__dirname + '/../dbconnection');
var user = sequelize.import(__dirname + '/user.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('dosen', {
		NIDN: DataType.STRING,
		NIP: DataType.STRING,
		fk_id_user: { 
			type: DataType.INTEGER,
			references: {
				model: user,
				key: 'id'
			}
		}
	},{
		timestamps: false
    });
}