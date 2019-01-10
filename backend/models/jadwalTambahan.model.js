var sequelize = require(__dirname + '/../dbconnection');
var user = sequelize.import(__dirname + '/user.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('jadwal_tambahan', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		fk_id_user: {
			type: DataType.INTEGER,
			references: {
				model: user,
				key: 'id'
			}
		},
		nama_event: DataType.STRING,
		tanggal: DataType.DATE,
		keterangan: DataType.TEXT
	},{
		timestamps: false
    });
}