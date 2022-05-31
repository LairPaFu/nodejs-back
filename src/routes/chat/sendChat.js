const {
  readJson,
  weiteJson
} = require('../../methods/jsonfile');

module.exports = function sendChat(message) {
  const content = readJson('chat_content.json')
  const s = JSON.parse(message)
  let c = {
    "id": content.length + 1,
    "userId": s.userId,
    "targetId": s.targetId,
    "content": s.content,
    "createTime": new Date().getTime(),
    "unread": false
  }
  content.push(c)
  weiteJson('chat_content.json', content)
  return c
}