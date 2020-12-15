const apiCall = require('./api');

const findUser = userId =>
  apiCall({
    path: `users/${userId}`
  });

module.exports = findUser;
