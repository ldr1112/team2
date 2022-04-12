const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');

// 등록
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.post('/', async (req, res) => {
  try {
    const params = {
      nick: req.body.nick,
      email: req.body.email,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.nick || !params.email) {
      const err = new Error('Not allowed null (name, userid, password)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await userService.reg(params);
    logger.info(`(user.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', async (req, res) => {
  try {
    const params = {
      nick: req.query.nick,
      email: req.query.email,
    };
    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
