var Sequelize = require('sequelize');

module.exports = new Sequelize('ingetin'/*DB name*/, 'root'/*DB username*/, ''/*DB password*/, {
	host: 'localhost',
	dialect: 'mysql'/*type of DBMS*/,

	pool: {
		/*Set max requesting to database*/
		max: 100,
		min: 0,
		idle: 200000,
		acquire: 200000
	},
	/*Set timezone to DB*/
	timezone: '+07:00'
});