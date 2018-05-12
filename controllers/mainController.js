var mysql = require('mysql');
var dateformat= require('dateformat');
module.exports = {
  //funciones del controlador
    
    //funcion que renderiza los usuarios en el index
  getUsers: function (req,res,next){
    var config = require ('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();

    var users =  null;

    db.query('SELECT * FROM emails, phones, user WHERE  emails.user_id_user = user.id_user AND phones.user_id_user = user.id_user AND user.id_user = user.id_user', function(err, rows, fields) {
      if(err) throw err;

      users = rows;
      db.end();

      res.render('index',{ title: "Usuarios", users: users });
    });
    
  },

  //Funcion para renderizar la pantalla del formulario para nuevo usuario
  getNewUser: function (req, res, next) {
    res.render('users/new');
  },

  //Funcion para agregar un nuevo usuario
  postNewUser: function (req,res,next) {
    var fechaActual = new Date();
    var fecha = dateformat(fechaActual,'yyyy-mm-dd'); 

    var user = {
      principal_name: req.body.name,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      create_date: fecha,
      RFC: req.body.RFC,
      bussiness_name: req.body.bussinessname
    }

    var config = require ('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();

    db.query('INSERT INTO user SET ?', user, function (err, rows, fields){
      if(err) throw err;
      const id_user = rows.insertId;
            db.query('INSERT INTO phones SET ?',{phone: req.body.phone, type: 'P', user_id_user: id_user }, 
              function(err, rows, fields){
                if(err) throw err;
                db.query('INSERT INTO emails SET ?',{email: req.body.email, type: 'P', user_id_user: id_user }, 
                  function(err, rows, fields){
                  if(err) throw err;
                  db.end();
                });
              });
    });

    res.render('users/new', {info: 'Usuario guardado'});
  },

  //funcion que nos permite eliminar usuario por su id
  deleteUser: function (req,res,next) {
    var id= req.body.id;
    var config = require ('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();
        var response = {res:false};
    db.query('DELETE FROM user WHERE id_user = ?', id, function (err, rows, fields){
      if(err) throw err;

      db.end();
      response.res =true;
      res.json(response);
    });
        
  },

  //funcion que renderiza la pagina de actualizacion de usuario
  getUpdateUser: function (req,res,next) {
    var id= req.params.id;
    var config = require ('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();

    var user =  null;
    var phone = null;
    var email = null;

    db.query('SELECT * FROM user WHERE id_user = ?',id, function(err, rows, fields) {
      if(err) throw err;
      user = rows;
      db.query('SELECT  phone FROM phones WHERE user_id_user = ?', id, function(err,rows,fields){
        phone = rows;
        db.query('SELECT  email FROM emails WHERE user_id_user = ?', id, function(err,rows,fields){
          email = rows;
          db.end();
          res.render('users/update',{ title: "Actualizar", user: user, phone: phone, email: email });  
        });  
      });
    });
  },

  //funcion que modifica el usuario
  postUpdateUser: function (req,res,next) {
    var user = {
      principal_name: req.body.name,
      lastname: req.body.lastname,
      middlename: req.body.middlename,
      RFC: req.body.RFC,
      bussiness_name: req.body.bussinessname
    }

    var config = require ('.././database/config');

    var db = mysql.createConnection(config);
    db.connect();
    db.query('UPDATE user SET ? WHERE ?',[user,{id_user: req.body.id_user}], function(err, rows, fields) {
      if(err) throw err;
            db.query('UPDATE phones SET ? WHERE ?',[{phone: req.body.phone, type: 'P'}, {user_id_user: req.body.id_user }], 
              function(err, rows, fields){
                if(err) throw err;
                db.query('UPDATE  emails SET ? WHERE ?',[{email: req.body.email, type: 'P'}, {user_id_user: req.body.id_user }], 
                  function(err, rows, fields){
                  if(err) throw err;
                  db.end();
                  res.redirect('/');
                });
              });
    });


  }
}