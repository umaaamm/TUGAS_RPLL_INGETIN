var sequelize = require(__dirname + '/../dbconnection');
var departemen = sequelize.import(__dirname + '/departemen.model'); 

module.exports = function(sequelize, DataType) {
	return sequelize.define('user', {
		username: DataType.STRING,
		password: DataType.STRING,
		nama: DataType.STRING,
		jenis_kelamin: DataType.CHAR,
		tempat_lahir: DataType.STRING,
		tanggal_lahir: DataType.DATE,
		alamat: DataType.STRING,
		fk_id_departemen: {
			type: DataType.INTEGER,
			references: {
				model: departemen,
				key: 'id'
			}
		}
	},{
		timestamps: false
    });
}