var express = require('express');
var router = express.Router();
var jadwalTambahans = require(__dirname + '/../controllers/jadwalTambahan.controller');

router.get('/getmyjadwaltambahan', (req, res, next) => { //buat reminder karena cuman ngambil event yang akan datang saja
    jadwalTambahans.getMyJadwalTambahan(req, res);
});

module.exports = router;