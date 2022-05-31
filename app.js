const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// WS
var websocket = require('ws');
var server = new websocket.Server({
  port: 8888
});
server.on('open', () => {
  console.log('open');
});
server.on('close', () => {
  console.log('close');
});
server.on('connection', (ws, req) => {
  console.log('connection连接成功');
  ws.on('message', (data) => {
    let c = require('./src/routes/chat/sendChat.js')(data)
    // data: 接收信息
    server.clients.forEach((item) => {
      // console.log(item);
      // console.log('------------------');
      if (item.readyState === ws.OPEN) {
        // console.log('' + data);
        item.send(JSON.stringify(c));
      }
    });
  });
})

// const s = genSign('L1915pf.')

// 采用设置所有均可访问的方法解决跨域问题
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type,Authorization');
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    res.end(); // 让options尝试请求快速结束
  } else {
    next();
  }
});
app.use(bodyParser.json()); // 以json格式返回出去
app.use(bodyParser.urlencoded({
  extended: false
}));
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'login2022'
const {
  ErrorModel
} = require("./src/model/responseModel")
const verifyToken = function (token) {
  try {
    let tokenKey = jwt.verify(token, SECRET_KEY)
    return {
      code: 200,
      msg: '校验成功',
      tokenKey,
    }
  } catch {
    return {
      code: 100,
      msg: '校验失败'
    }
  }
}

// token验证中间件
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  const last_url = req.url.split('/')
  const parmas = req.url.split('?')[1] ? req.url.split('?')[1].split('&') : []
  for (let i = 0; i < parmas.length; i++) {
    let p = parmas[i].split('=')
    req.body[p[0]] = p[1]
  }
  if (last_url[1] != "src" && last_url[last_url.length - 1] != 'login' && last_url[last_url.length - 1] != 'register') {
    // 获取token
    let token = req.headers.authorization
    if (!token) {
      res.send(new ErrorModel(401, '身份未授权'))
      return;
    }
    let result = verifyToken(token.split(' ')[1])
    if (result.code == 100) {
      res.send(new ErrorModel(403, 'token已过期'))
    } else {
      req.token = result.tokenKey.user
      next();
    }
  } else {
    next();
  }
})

// 后端api路由
app.use('/api', require('./src/routes/index'));

app.use(express.static(__dirname));

// 监听端口
app.listen(5000, () => {
  console.log('success listen at port:5000......');
});