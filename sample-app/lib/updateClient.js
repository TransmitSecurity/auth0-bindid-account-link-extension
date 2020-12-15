const apiCall = require('./api');

// update client / application
// body according to - https://auth0.com/docs/api/management/v2#!/Clients/patch_clients_by_id
const updateClient = (clientId, body) =>
  apiCall({
    method: 'PATCH',
    path: `clients/${clientId}`,
    body: body
  });

module.exports = updateClient;
