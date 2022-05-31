var jsonFile = require('jsonfile')
var baseUrl = 'src/data/'

function readJson(fileName) {
  return jsonFile.readFileSync(baseUrl + fileName);
}

function weiteJson(fileName, data) {
  return jsonFile.writeFileSync(baseUrl + fileName, data)
}

module.exports = {
  readJson,
  weiteJson
};