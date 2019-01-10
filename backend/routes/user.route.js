var express = require('express');
var router = express.Router();
var users = require(__dirname + '/../controllers/user.controller');

router.post('/createuser', (req, res, next) => {
    users.createUser(req, res);
});

router.put('/updatepassword/:id', (req, res, next) => { 
    users.updatePassword(req, res);
});

router.get('/getalluser', (req, res, next) => { 
    users.getAllUser(req, res);
});

router.get('/getuserbyid/:id', (req, res, next) => {
    users.getUserById(req, res);
});

router.delete('/deleteuserbyid/:id', (req, res, next) => {
    users.deleteUserById(req, res);
});

router.post('/login', (req, res, next) => { 
    users.login(req, res);
});

module.exports = router;