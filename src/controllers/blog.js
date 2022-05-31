// 博客相关方法
const getList = () => {
  // 数据库获取数据
  return [{
      id: '1',
      title: '内容1',
      author: 'PaFu',
      createdAt: 1649752295041,
    },
    {
      id: '2',
      title: '内容2',
      author: 'PaFu',
      createdAt: 1649752595568,
    },
    {
      id: '2',
      title: '内容1',
      author: 'PaFu',
      createdAt: 1649755295569,
    }
  ]
}

module.exports = {
  getList
}