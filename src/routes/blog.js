const {
  SuccessModel
} = require("../model/responseModel")

const {
  getList
} = require("../controllers/blog")

// 处理博客相关路由
const handleBlogRoute = (options) => {
  if (options.method === 'GET' && options.path === '/api/blog/list') {
    const author = options.query.author || ''

    const listData = getList(author)
    return new SuccessModel(listData)
  }
}

module.exports = handleBlogRoute