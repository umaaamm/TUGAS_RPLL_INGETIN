var sequelize = require(__dirname + '/../dbconnection');
var user = sequelize.import(__dirname + '/user.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('mahasiswa', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		NIM: DataType.STRING,
		fk_id_user: { 
			type: DataType.INTEGER,
			references: {
				model: user,
				key: 'id'
			}
		},
		status: DataType.STRING,
		tanggal_masuk_univ: DataType.DATE,
		tanggal_lulus: DataType.DATE
	},{
		timestamps: false
    });
}