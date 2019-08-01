export function encode(text) {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function decode(text) {
  return Buffer.from(text, 'base64').toString('utf8');
}
