const { managementApi } = require('auth0-extension-tools');
const request = require('request');

// Memoized because config unavailable at this point
const urlHelper = {
  base: undefined,
  getBaseUrl() {
    if (!this.base) {
      this.base = `https://${process.env.AUTH0_DOMAIN}/api/v2`;
    }

    return this.base;
  },
  endpoint(path) {
    return `${this.getBaseUrl()}/${path}`;
  }
};

const getToken = () =>
  managementApi.getAccessTokenCached(
    process.env.AUTH0_DOMAIN,
    process.env.AUTH0_API_CLIENT_ID,
    process.env.AUTH0_API_CLIENT_SECRET
  );

const apiCall = ({ path, ...options } = {}) =>
  getToken().then(
    token =>
      new Promise((resolve, reject) => {
        request(
          {
            url: urlHelper.endpoint(path),
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json'
            },
            json: true,
            ...options
          },
          (err, response, body) => {
            if (err) {
              reject(err);
            } else if (response.statusCode < 200 || response.statusCode >= 300) {
              console.log('API call failed: ', response.status, body);
              reject(new Error(body));
            } else {
              resolve(response.body);
            }
          }
        );
      })
  );

module.exports = apiCall;
