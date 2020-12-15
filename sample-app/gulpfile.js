const gulp = require('gulp');
const util = require('gulp-util');
const ngrok = require('ngrok');
const dotenv = require('dotenv');
const updateClient = require('./lib/updateClient');
var spawn = require('child_process').spawn;

dotenv.load();

gulp.task('run', async () => {

  const url = await ngrok.connect(process.env.PORT).catch(err => {
    console.log("Ngrok Error: " + err);
    return;
  })

  // override the callback url to use ngrok url 
  process.env.AUTH0_CALLBACK_URL = url + '/callback';
  process.env.AUTH0_LOGOUT_URI = url;
  
  setTimeout(() => {
    // update application whitelisted callback uris 
    updateClient(process.env.AUTH0_CLIENT_ID, {
      callbacks: [ 
        process.env.AUTH0_CALLBACK_URL
      ]
    })
    .then(() => {
      util.log('Client callbacks updated successfully');
    })
    .catch((error) => {
      util.log("Failed to update client callbacks: ", error);
    });      
    spawn('node', [ 'bin/www' ], { stdio: 'inherit' });
  }, 2000);

});
