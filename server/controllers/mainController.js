var mysql = require('mysql');

module.exports = {
	//funciones del controlador

	index: function (req,res,next){
		var config = require ('.././database/config');

		var db = mysql.createConnection(config);
		db.connect();

		var users =  null;

		db.query('SELECT * FROM user', function(err, rows, fields) {
			if(err) throw err;

			users = rows;
			db.end();

			res.render('index',{title: JSON.stringify(users)});
		});
		
	}
}