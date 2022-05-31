const express = require('express');
const router = express.Router();

// 登录
router.use('/', require('./login'));
// 用户
router.use('/user', require('./user'));
// 聊天
router.use('/', require('./chat'));

module.exports = router;