const http = require('http');
const URL = require('url')

const server = http.createServer((req, res) => {
  let method = req.method
  console.log('method', method);
  res.setHeader('Content-Type', 'application/json')
  if (method === 'POST') {
    let postData = ''
    // 流 stream
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      console.log(postData);
      res.end('数据已接收！' + postData)
    })

    console.log('post data content type', req.headers['content-type']);
  }
  if (method === 'GET') {
    let url = req.url
    console.log('url', url);
    req.query = URL.parse(url, true).query
    console.log('query', req.query);
    // res.end('Hello World!')
    res.end(JSON.stringify(req.query))
  }
})

server.listen(5000, () => {
  console.log('server running at port 5000');
})