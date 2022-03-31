const passport = require('passport');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => { // 로그인 시에만 실행
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => { // 매 요청 시 실행
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  kakao();
};
