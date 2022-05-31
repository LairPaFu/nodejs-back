const express = require('express');
const router = express.Router();

// 聊天
router.use('/chat', require('./chat/index'));


module.exports = router;