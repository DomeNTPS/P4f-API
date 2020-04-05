var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var running_equipmentRouter = require('./routes/running_equipment');
var employee = require('./routes/employee');
var updatewithdraw = require('./routes/updatewithdraw');
var insertwithdraw = require('./routes/insertwithdraw');
var equip_table = require('./routes/equip_table');
var selectlog = require('./routes/selectlog');
var insertlog = require('./routes/insertlog');
var updateinventory = require('./routes/updateinventory');
var insertbrokeequip = require('./routes/insertbrokeequip');

var setreturnwithdraw = require('./routes/setreturnwithdraw');
var itemcheck = require('./routes/itemcheck');
var addinventory = require('./routes/addinventory');
var returnwithdraw = require('./routes/returnwithdraw');
var changeRunningEquip = require('./routes/changeRunningEquip');
var cors = require('cors');

const port = 5000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors({
  credentials:true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/running_equipment', running_equipmentRouter);
app.use('/employee', employee);
app.use('/updatewithdraw', updatewithdraw);
app.use('/insertwithdraw', insertwithdraw);
app.use('/equip_table', equip_table);
app.use('/selectlog', selectlog);
app.use('/insertlog', insertlog);
app.use('/updateinventory', updateinventory);
app.use('/insertbrokeequip', insertbrokeequip);

app.use('/itemcheck', itemcheck);
app.use('/addinventory', addinventory);
app.use('/setreturnwithdraw', setreturnwithdraw);
app.use('/returnwithdraw',returnwithdraw);
app.use('/changeRunningEquip', changeRunningEquip);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
