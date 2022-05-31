const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'login2022'

const {
  genSign,
  deSign
} = require('../../methods/crypto')
const {
  readJson,
  weiteJson
} = require('../../methods/jsonfile');
const {
  SuccessModel,
  ErrorModel
} = require("../../model/responseModel")

// 登录
router.post('/login', (req, res) => {
  console.log('登录接口');
  if (!req.body.username) {
    res.send(new ErrorModel(401, '请输入用户名'))
    return;
  }
  if (!req.body.password) {
    res.send(new ErrorModel(401, '请输入密码'))
    return;
  }
  req.body.password = genSign(req.body.password)
  const user = readJson('user.json')
  const check_username = user.findIndex((v) => v.username == req.body.username || v.email == req.body.username)
  if (check_username == -1) {
    res.send(new ErrorModel(401, '用户不存在'))
    return
  }
  if (user[check_username].password == req.body.password) {
    res.send(new ErrorModel(401, '密码不正确'))
    return
  }
  const token = jwt.sign({
      user: {
        id: user[check_username].id,
      }
    },
    SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    }
  )
  // 发送
  res.send(new SuccessModel({
    token
  }, '登录成功'));
});
// 注册
router.post('/register', (req, res) => {
  console.log('注册接口');
  if (!req.body.nickname) {
    res.send(new ErrorModel(401, '请输入昵称'))
    return;
  }
  if (!req.body.username) {
    res.send(new ErrorModel(401, '请输入用户名'))
    return;
  }
  if (!req.body.email) {
    res.send(new ErrorModel(401, '请输入邮箱'))
    return;
  }
  if (!req.body.password) {
    res.send(new ErrorModel(401, '请输入密码'))
    return;
  }
  req.body.password = genSign(req.body.password)
  const user = readJson('user.json')
  console.log(user);
  if (user.findIndex(v => v.username == req.body.username) != -1) {
    res.send(new ErrorModel(401, '用户名已存在'))
    return;
  }
  if (user.findIndex(v => v.email == req.body.email) != -1) {
    res.send(new ErrorModel(401, '邮箱已被使用'))
    return;
  }
  let id = user.length + 1
  user.push({
    "id": id,
    "username": req.body.username,
    "email": req.body.email,
    "password": deSign(req.body.password),
    "nickname": req.body.nickname,
    "avatar": ""
  })
  weiteJson('user.json', user)
  const token = jwt.sign({
      user: {
        id,
      }
    },
    SECRET_KEY, {
      expiresIn: 60 * 60 * 24
    }
  )
  // 发送
  res.send(new SuccessModel({
    token
  }, '注册成功'));
});
module.exports = router;