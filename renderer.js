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


