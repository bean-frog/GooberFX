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


ipcRenderer.send('request-data');

ipcRenderer.on('data-response', (event, { error, data }) => {
  const dataList = document.getElementById('data-list');
  if (error) {
    console.log('error:' + error);
  } else {
    loadCues(data)
  }
});