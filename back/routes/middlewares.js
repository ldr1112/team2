exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    console.log('로그인 이프문');
  } else {
    res.status(403).send('로그인 필요');
    console.log('로그인해라');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticatedI()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
