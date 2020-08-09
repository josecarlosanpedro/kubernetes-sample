const mysql = require('mysql2')
const caching_sha2_password = require('mysql2/lib/auth_plugins/caching_sha2_password.js');
module.exports = () => {
	return mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DB,
		authPlugins: { 
			sha256_password: caching_sha2_password({})
		}
	}); 
	
} 
	
	