var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fetch = require('node-fetch');
var path = require('path');

var usersRouter = require(__dirname+ '/routes/user.route');
var jadwalKuliahRouter = require(__dirname+ '/routes/jadwalKuliah.route');
var jadwalUjianRouter = require(__dirname+ '/routes/jadwalUjian.route');
var mahasiswaRouter = require(__dirname+ '/routes/mahasiswa.route');
var mataKuliahRouter = require(__dirname+ '/routes/mataKuliah.route');
var deadlineTugasRouter = require(__dirname+ '/routes/deadlineTugas.route');
var jadwalTambahanRouter = require(__dirname+ '/routes/jadwalTambahan.route');
var kalenderRouter = require(__dirname+ '/routes/kalender.route');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.send(req.protocol);
});

//For Route
app.use('/user', usersRouter);
app.use('/jadwalkuliah', jadwalKuliahRouter);
app.use('/jadwalujian', jadwalUjianRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/matakuliah', mataKuliahRouter);
app.use('/deadlinetugas', deadlineTugasRouter);
app.use('/jadwaltambahan', jadwalTambahanRouter);
app.use('/kalender', kalenderRouter);

app.use('*', function(req, res, next){
  res.json({status:false, message:'non API implemented'})
})

module.exports = app;
