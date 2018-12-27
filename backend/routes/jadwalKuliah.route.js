var express = require('express');
var router = express.Router();
var jadwalKuliahs = require(__dirname + '/../controllers/jadwalKuliah.controller');

router.get('/getmyjadwalkuliah', (req, res, next) => { 
    jadwalKuliahs.getMyJadwalKuliah(req, res);
});

module.exports = router;