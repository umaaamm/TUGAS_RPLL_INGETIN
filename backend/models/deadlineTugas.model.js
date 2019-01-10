var sequelize = require(__dirname + '/../dbconnection');
var pengajar = sequelize.import(__dirname + '/pengajar.model');

module.exports = function(sequelize, DataType) {
	return sequelize.define('deadline_tugas', {
		id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
		fk_id_pengajar: {
			type: DataType.INTEGER,
			references: {
				model: pengajar,
				key: 'id'
			}
		},
		keterangan: DataType.TEXT,
		created_at: DataType.DATE,
		batas_pengumpulan: DataType.DATE,
		status: DataType.STRING
	},{
		timestamps: false
    });
}