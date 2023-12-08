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





// Handle IPC event to read JSON file
ipcMain.handle('read-json-file', (event) => {
  const filePath = path.join(__dirname, 'data.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
});

// Handle IPC event to update JSON file by overwriting
ipcMain.handle('update-json-file-overwrite', (event, newData) => {
  const filePath = path.join(__dirname, 'data.json');

  try {
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error overwriting JSON file:', error);
    return false;
  }
});

// Handle IPC event to update JSON file by adding
//THIS DOES NOT WORK MAKE IT WORK
ipcMain.handle('update-json-file-add', (event, newData) => {
    // Get the path to the data.json file
    const filePath = path.join(__dirname, 'data.json');

    // Read the existing data from the file
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      // Handle the error, e.g., if the file doesn't exist yet
      console.error('Error reading data.json:', error);
    }

    // Add the new data to the existing data
    existingData.push(newData);

    // Write the updated data back to the file
    try {
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
      console.log('Data added to data.json successfully.');
    } catch (error) {
      // Handle the error when writing to the file
      console.error('Error writing data to data.json:', error);
    }

    // Optionally, send a response back to the renderer process
    event.sender.send('update-json-file-add-success', existingData);

    // You can also update the mainWindow if needed
    // mainWindow.webContents.send('update-json-file-add-success', existingData);
  });
