var express = require('express');
var router = express.Router();
var jadwalUjians = require(__dirname + '/../controllers/jadwalUjian.controller');

router.get('/getmyjadwalujian', (req, res, next) => { //buat reminder karena cuman ngambil event yang akan datang saja
    jadwalUjians.getMyJadwalUjian(req, res);
});

module.exports = router;