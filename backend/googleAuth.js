const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Load client secrets from a local file
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

module.exports = oAuth2Client;
