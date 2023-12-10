const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('./src/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (mainWindow === null) createWindow();
  });
});

if (!fs.existsSync('./sounds')) {
  fs.mkdirSync('./sounds');
  console.log('The "sounds" folder has been created.');
} else {
  console.log('The "sounds" folder already exists.');
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('getFilenames', (event, directoryPath) => {
  try {
    const filenames = fs.readdirSync(path.join(__dirname, directoryPath));
    event.reply('filenames', filenames);
  } catch (error) {
    event.reply('filenames', { error: error.message });
  }
});
ipcMain.on('request-data', (event) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      event.sender.send('data-response', { error: err.message });
    } else {
      const jsonData = JSON.parse(data);
      event.sender.send('data-response', { data: jsonData });
    }
  });
});



