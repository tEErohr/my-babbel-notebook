module.exports = {
  encode: text => Buffer.from(text, 'utf8').toString('base64')
};
