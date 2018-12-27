var express = require('express');
var router = express.Router();
var deadlineTugass = require(__dirname + '/../controllers/deadlineTugas.controller');

router.get('/getmydeadlinetugas', (req, res, next) => { //buat reminder karena cuman ngambil event yang akan datang saja
    deadlineTugass.getMyDeadlineTugas(req, res);
});

router.get('/getmydeadlinetugasbyidmatakuliah/:id', (req, res, next) => { //params id
    deadlineTugass.getMyDeadlineTugasByIdMataKuliah(req, res);
});

module.exports = router;