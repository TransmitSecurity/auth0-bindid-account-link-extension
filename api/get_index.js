const { decode } = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../lib/config');
const findUser = require('../lib/findUser');
const indexTemplate = require('../templates/index');
const logger = require('../lib/logger');
const stylesheet = require('../lib/stylesheet');
const { resolveLocale } = require('../lib/locale');
const { getSettings } = require('../lib/storage');

const decodeToken = token =>
  new Promise((resolve, reject) => {
    try {
      resolve(decode(token));
    } catch (e) {
      reject(e);
    }
  });

module.exports = () => ({
  method: 'GET',
  path: '/',
  config: {
    auth: false
  },
  handler: (req, reply) => {
    if (_.isEmpty(req.query)) {
      reply.redirect(`${config('PUBLIC_WT_URL')}/admin`);
      return;
    }
    const stylesheetHelper = stylesheet(config('NODE_ENV') === 'production');
    const stylesheetTag = stylesheetHelper.tag('link');
    const customCSSTag = stylesheetHelper.tag(config('CUSTOM_CSS'));

    const dynamicSettings = {};

    if (req.query.locale) dynamicSettings.locale = req.query.locale;
    if (req.query.color) dynamicSettings.color = `#${req.query.color}`;
    if (req.query.title) dynamicSettings.title = req.query.title;
    if (req.query.logoPath) dynamicSettings.logoPath = req.query.logoPath;

    decodeToken(req.query.child_token)
      .then((token) => {
        findUser(token.sub)
          .then(_ => {
            getSettings().then((settings) => {
              const userMetadata = {};
              const locale = typeof userMetadata.locale === 'string' ? userMetadata.locale : settings.locale;
              reply(
                indexTemplate({
                  dynamicSettings,
                  stylesheetTag,
                  customCSSTag,
                  locale
                })
              );
            });
          })
          .catch((err) => {
            const state = req.query.state;
            logger.error('An error was encountered: ', err);
            logger.info(
              `Redirecting to failed link to /continue: ${token.iss}continue?state=${
                req.query.state
              }`
            );
            console.log("Redirecting to contienu....")
            reply.redirect(`${token.iss}continue?state=${state}`);
          });
      })
      .catch((err) => {
        logger.error('An invalid token was provided', err);
        console.l
        indexTemplate({
          dynamicSettings,
          stylesheetTag,
          currentUser: null,
          matchingUsers: [],
          customCSSTag
        }).then((template) => {
          reply(template).code(400);
        });
      });
  }
});
