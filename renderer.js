const { ipcRenderer } = require('electron');


async function getFilenames() {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('getFilenames', '/sounds');

    ipcRenderer.on('filenames', (event, filenames) => {
      if (filenames.error) {
        reject(filenames.error);
      } else {
        resolve(filenames);
      }
    });
  });
}

let cueData;
ipcRenderer.send('request-data');

ipcRenderer.on('data-response', (event, { error, data }) => {
  if (error) {
    console.log('error:' + error);
  } else {
    loadCues(data);
    cueData = data;
  }
});