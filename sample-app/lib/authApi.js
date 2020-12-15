const request = require('request');


const urlHelper = {
  base: undefined,
  getBaseUrl() {
    if (!this.base) {
      this.base = `https://${process.env.AUTH0_DOMAIN}/v2`;
    }

    return this.base;
  },
  endpoint(path) {
    return `${this.getBaseUrl()}/${path}`;
  }
};

const authApiCall = ({ path, ...options } = {}) =>
  new Promise((resolve, reject) => {
    request(
      {
        url: urlHelper.endpoint(path),
        headers: {
          Accept: 'application/json'
        },
        json: true,
        ...options
      },
      (err, response, body) => {
        if (err) {
          reject(err);
        } else if (response.statusCode < 200 || response.statusCode >= 300) {
          console.log(urlHelper.endpoint(path))
          console.log('API call failed: ', response.status, body);
          reject(new Error(body));
        } else {
          resolve(response.body);
        }
      }
    );
  });

module.exports = { 
  logout 
};