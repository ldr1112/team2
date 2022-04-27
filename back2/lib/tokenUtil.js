const jwt = require('jsonwebtoken');

const secretKey = 'jXn2r5u8x/A?D(G+KbPeShVmYp3s6v9y';
const options = {
  expiresIn: '2h', // 만료시간
};

const tokenUtil = {
  // 토큰 생성
  makeToken(user) {
    const payload = {
      id: user.id,
      userId: user.userId,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, secretKey, options);

    return token;
  },
  // 토큰 검증
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err) {
      return null;
    }
  },
};

module.exports = tokenUtil;
