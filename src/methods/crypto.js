const crypto = require('crypto');
let str = 'abcd';
const key = Buffer.from('P7cVeCI4yJqa9kDy', 'utf8');
const iv = Buffer.from('elFkCoKcgtk3pUex', 'utf8');

// 加密
function genSign(src) {
  let sign = '';
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  sign += cipher.update(src, 'utf8', 'hex');
  sign += cipher.final('hex');
  return sign;
}

// 解密
function deSign(sign) {
  let src = '';
  const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  src += cipher.update(sign, 'hex', 'utf8');
  src += cipher.final('utf8');
  return src;
}


module.exports = {
  crypto,
  genSign,
  deSign
};