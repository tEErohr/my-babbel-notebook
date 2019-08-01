const urlUtil = require('url');

export const hostFromURL = (url) => {
  const { hostname, protocol } = urlUtil.parse(url);
  return urlUtil.format({ hostname, protocol });
};
