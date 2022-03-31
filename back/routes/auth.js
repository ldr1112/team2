const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const KakaoStrategy = require('passport-kakao').Strategy;

const router = express.Router();

passport.use('kakao', new KakaoStrategy({
  clientID: '카카오에서 발급받은 REST API KEY 넣기',
  cllbackURL: '/auth/kakao/callback', // 위에서 설정한 Redirect URI
}, async (accessToken, refreshToken, profile, done) => {
  // console.log(profile)
  console.log(accessToken);
  console.log(refreshToken);
}));

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
