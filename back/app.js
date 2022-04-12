const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const pageRouter = require('./routes/page');
const { sequelize } = require('./models');

const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
const models = require('./models/index');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
passportConfig(); // passport 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');

logger.info('app start');
dotenv.config();

const { NODE_ENV } = process.env;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB 연결 확인 및 table 생성
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success');

  // sequelize sync (table 생성)
  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync success');
  }).catch((err) => {
    logger.error('Sequelize sync error', err);
  });
}).catch((err) => {
  logger.error('DB Connection fail', err);
});
// app.use(logger('dev'));
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', pageRouter);
app.use('/auth', authRouter);

// passport
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // next(createError(404));
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
  console.log('404');
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
