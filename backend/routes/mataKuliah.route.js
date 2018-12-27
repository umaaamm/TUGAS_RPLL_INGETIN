var express = require('express');
var router = express.Router();
var mataKuliahs = require(__dirname + '/../controllers/mataKuliah.controller');

router.get('/getmymatakuliah', (req, res, next) => { 
    mataKuliahs.getMyMataKuliah(req, res);
});

module.exports = router;