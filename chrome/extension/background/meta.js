const axios = require('axios');
const base64 = require('./base64');

const fetchMetadata = url =>
  axios.get(`http://localhost:9090/metadata?url=${base64.encode(url)}`).then(response => response.data);

module.exports = {
  fetchMetadata
};
