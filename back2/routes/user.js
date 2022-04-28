const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const userService = require('../service/userService');

// 등록
router.post('/', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      userId: req.body.userId,
      password: req.body.password,
      email: req.body.email,
    };
    logger.info(`(user.reg.params) ${JSON.stringify(params)}`);

    // 입력값 null 체크
    if (!params.name || !params.userId || !params.password) {
      const err = new Error('Not allowed null (name, userId, password)');
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
      name: req.query.name,
      userId: req.query.userId,
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
// 상세정보 조회
router.get('/:id', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      name: req.body.name,
    };
    logger.info(`(profile.info.params) ${JSON.stringify(params)}`);

    const result = await userService.info(params);
    logger.info(`(profile.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    };
    logger.info(`(profile.update.params) ${JSON.stringify(params)}`);

    const result = await userService.edit(params);
    logger.info(`(profile.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    };
    logger.info(`(profile.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.delete(params);
    logger.info(`(profile.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
