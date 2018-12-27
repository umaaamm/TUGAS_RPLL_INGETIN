var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var usersRouter = require(__dirname+ '/routes/user.route');
var jadwalKuliahRouter = require(__dirname+ '/routes/jadwalKuliah.route');
var jadwalUjianRouter = require(__dirname+ '/routes/jadwalUjian.route');
var mahasiswaRouter = require(__dirname+ '/routes/mahasiswa.route');
var mataKuliahRouter = require(__dirname+ '/routes/mataKuliah.route');
var deadlineTugasRouter = require(__dirname+ '/routes/deadlineTugas.route');
var jadwalTambahanRouter = require(__dirname+ '/routes/jadwalTambahan.route');
var kalenderRouter = require(__dirname+ '/routes/kalender.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//For Route
app.use('/user', usersRouter);
app.use('/jadwalkuliah', jadwalKuliahRouter);
app.use('/jadwalujian', jadwalUjianRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/matakuliah', mataKuliahRouter);
app.use('/deadlinetugas', deadlineTugasRouter);
app.use('/jadwaltambahan', jadwalTambahanRouter);
app.use('/kalender', kalenderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
