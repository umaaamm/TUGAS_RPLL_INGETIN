var express = require('express');
var router = express.Router();
var mahasiswas = require(__dirname + '/../controllers/mahasiswa.controller');

router.get('/getmyprofile', (req, res, next) => { 
    mahasiswas.getMyProfile(req, res);
});

module.exports = router;