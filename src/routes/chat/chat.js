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

// 聊天列表
router.get('/list', (req, res) => {
  console.log('聊天列表');
  const list = readJson('chat_list.json')
  const content = readJson('chat_content.json')
  const user = readJson('user.json')
  let list_arr = list.filter((v) => v.userId == req.token.id)
  // console.log(list_arr);
  list_arr = list_arr.map(v => {
    let user_info = user[user.findIndex((val) => val.id == v.targetId)]
    let content_arr = content.filter(val => {
      return (val.userId == v.userId &&
          val.targetId == v.targetId) ||
        (val.userId == v.targetId &&
          val.targetId == v.userId)
    })
    let content_info = {
      "content": "",
      "time": 0
    }
    let unread = content.filter(val => v.targetId == val.userId && val.unread == false).length
    // console.log(content_arr);
    if (content_arr.length > 0) {
      content_info = content_arr[content_arr.length - 1]
    }
    return {
      ...v,
      "nickname": user_info.nickname,
      "avatar": user_info.avatar,
      "content": content_info.content,
      "time": content_info.createTime,
      "unread": unread
    }
  })
  res.send(new SuccessModel(list_arr, '请求成功'))
  return
});

//  聊天已读
router.post('/readed', (req, res) => {
  console.log('聊天已读');
  const content = readJson('chat_content.json')
  let c = content.map(v => {
    if (req.body.userId == v.userId) {
      v.unread = true
    }
    return v
  })
  weiteJson('chat_content.json', c)
  res.send(new SuccessModel({}, '请求成功'))
  return
})

// 聊天记录
router.get('/record', (req, res) => {
  console.log('聊天记录');
  const content = readJson('chat_content.json')
  const user = readJson('user.json')
  // console.log(req.body.userId, req.token.id);
  let record = content.filter(v => {
    return (v.userId == req.body.userId &&
        v.targetId == req.token.id) ||
      (v.userId == req.token.id &&
        v.targetId == req.body.userId)
  })
  record = record.map(v => {
    let user_info = user[user.findIndex((val) => val.id == v.userId)]
    return {
      ...v,
      "nickname": user_info.nickname,
      "avatar": user_info.avatar,
    }
  })
  res.send(new SuccessModel(record, '请求成功'))
  return
});

module.exports = router;