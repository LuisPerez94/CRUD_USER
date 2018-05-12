var express = require('express');
var router = express.Router();

var controllers = require('.././controllers');

/* GET home page. */
router.get('/', controllers.mainController.getUsers);
router.get('/newUser', controllers.mainController.getNewUser);
router.post('/createUser', controllers.mainController.postNewUser);
router.post('/deleteUser', controllers.mainController.deleteUser);
router.get('/updateUser/:id', controllers.mainController.getUpdateUser);
router.post('/updateUser', controllers.mainController.postUpdateUser);
module.exports = router;
