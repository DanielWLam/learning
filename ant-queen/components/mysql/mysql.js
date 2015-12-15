var _ = require('underscore'),
	mysql = require('mysql'),
    conf = require('../../conf');
	
function init(callback) {
	pool = mysql.createConnection({
		host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "123456",
        database: 'antTest'
	});

	exports.pool = pool;
	// console.log(callback)
	callback(null, pool);
}
exports.init = init;
