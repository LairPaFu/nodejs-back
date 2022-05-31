const express = require('express');
const router = express.Router();

const {
  SuccessModel,
  ErrorModel
} = require("../../model/responseModel")

const {
  readJson
} = require('../../methods/jsonfile');

router.all('*', function (req, res, next) {
  console.log('用户接口');
  next();
})

router.get('/info', (req, res) => {
  const user = readJson('user.json')
  try {
    const check_user = user.findIndex((v) => v.id == req.token.id)
    if (check_user == -1) {
      res.send(new ErrorModel(401, '身份验证失败'))
      return
    }
    // 发送
    res.send(new SuccessModel(user[check_user], '请求成功'));
  } catch (e) {
    res.send(new ErrorModel(401, '身份验证失败'))
    return
  }
});

module.exports = router;