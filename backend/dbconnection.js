var Sequelize = require('sequelize');

module.exports = new Sequelize('db8f5nal8vfivk'/*DB name*/, 'jgyxomcwehubht'/*DB username*/, '5cd994e0703f5900b5239398fa92570698ea230225fc7e8631abef6608f46ab3'/*DB password*/, {
	host: 'ec2-54-235-247-209.compute-1.amazonaws.com',
	dialect: 'postgres'/*type of DBMS*/,

	pool: {
		/*Set max requesting to database*/
		max: 100,
		min: 0,
		idle: 200000,
		acquire: 200000
	},
	/*Set timezone to DB*/
	timezone: '+07:00',
	logging: false,
	dialectOptions: {
    	ssl: true
  	}
});