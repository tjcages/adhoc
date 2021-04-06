// const { app, BrowserWindow } = require('electron')
// const path = require('path')
// const url = require('url')

// const windowStateKeeper = require('electron-window-state');

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the JavaScript object is garbage collected.
// let win;

// // Keep a reference for dev mode
// let dev = false;
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true;
// }

// function createWindow () {
//     // Load the previous state with fallback to defaults
//     let mainWindowState = windowStateKeeper({
//     defaultWidth: 1000,
//     defaultHeight: 800
//     });

//     // Create the window using the state information
//     win = new BrowserWindow({
//         x: mainWindowState.x,
//         y: mainWindowState.y,
//         width: mainWindowState.width,
//         height: mainWindowState.height,
//         titleBarStyle: 'hiddenInset',
//         webPreferences: {
//             nodeIntegration: true,
//             enableRemoteModule: true,
//             webviewTag: true, // https://www.electronjs.org/docs/api/webview-tag
//         },
//     });

//     // Let us register listeners on the window, so we can update the state
//     // automatically (the listeners will be removed when the window is closed)
//     // and restore the maximized or full screen state
//     mainWindowState.manage(win);

//     // Load web debugging tools
//     win.webContents.openDevTools()

//     // Load the index.html of the app.
//     let indexPath;
//     if (dev && process.argv.indexOf('--noDevServer') === -1) {
//         indexPath = url.format({
//         protocol: 'http:',
//         host: 'localhost:3000',
//         pathname: './index.html',
//         slashes: true
//         });
//     } else {
//         indexPath = url.format({
//         protocol: 'file:',
//         pathname: path.join(__dirname, 'dist', './index.html'),
//         slashes: true
//         });
//     }
//     win.loadURL(indexPath);
// }

// try {
//     require('electron-reloader')(module)
// } catch (_) {}

// app.whenReady().then(createWindow)

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//     }
// })

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}