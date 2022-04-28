const crypto = require('crypto');

const iterations = 1005; // 반복횟수(1000번 이상)

const hashUtil = {
  // hash함수 생성
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt 생성
      const salt = crypto.randomBytes(64).toString('base64');

      // 2. hash 생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 최종 패스워드 (password=salt.hash)
        const encryptedPassword = `${salt}.${hash}`;

        resolve(encryptedPassword);
      });
    });
  },
  // 비밀번호 확인
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error('Not allowed null (password)'));
      }

      // 1. salt와 hash 분리
      const encryptedPasswordSplit = encryptedPassword.split('.');
      const salt = encryptedPasswordSplit[0];
      const encryptedHash = encryptedPasswordSplit[1];

      // 2. 입력된 password로부터 hash생성
      crypto.pbkdf2(password, salt, iterations, 64, 'sha256', (err, derivedKey) => {
        if (err) throw err;

        const hash = derivedKey.toString('hex');

        // 입력된 password와 암호화된 password를 비교한다.
        if (hash === encryptedHash) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
};

module.exports = hashUtil;
