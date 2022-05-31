// 创建服务器
const http = require('http')

const serverHandler = require('../app')

const PORT = 5000

const server = http.createServer(serverHandler).listen(PORT, () => {
  console.log('server running at port 5000...');
})