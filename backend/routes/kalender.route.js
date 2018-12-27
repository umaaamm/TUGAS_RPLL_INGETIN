var express = require('express');
var router = express.Router();
var kalenders = require(__dirname + '/../controllers/kalender.controller');

router.get('/getmykalender/:tahun/:bulan', (req, res, next) => { //buat get kalender/ params bulan dimulai dari 0 contoh 0 = Januari
    kalenders.getMyKalender(req, res);
});

module.exports = router;