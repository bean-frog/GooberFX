const { ipcRenderer } = require('electron');


 function getFilenames() {
      ipcRenderer.send('getFilenames', '/sounds');
    }

    ipcRenderer.on('filenames', (event, filenames) => {
      if (filenames.error) {
        console.error('Error fetching filenames:', filenames.error);
      } else {
        console.log('Filenames:', filenames);
      }
    });


// Function to read JSON file
async function readJsonFile() {
  try {
    const jsonData = await ipcRenderer.invoke('read-json-file');
    console.log('Read JSON file:', jsonData);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file in renderer process:', error);
    return null;
  }
}

// Example usage to update JSON file by overwriting
const newDataToOverwrite = { key: 'new value' };
updateJsonFileOverwrite(newDataToOverwrite);

// Example usage to update JSON file by adding new data
const newDataToAdd = { key: 'additional value' };
updateJsonFileAdd(newDataToAdd);

async function updateJsonFileOverwrite(newData) {
  try {
    const success = await ipcRenderer.invoke('update-json-file-overwrite', newData);
    if (success) {
      console.log('JSON file overwritten successfully');
      readJsonFile(); // Optional: Read and log the updated data
    } else {
      console.error('Failed to overwrite JSON file');
    }
  } catch (error) {
    console.error('Error overwriting JSON file in renderer process:', error);
  }
}

async function updateJsonFileAdd(newData) {
  try {
    const success = await ipcRenderer.invoke('update-json-file-add', newData);
    if (success) {
      console.log('Data added to JSON file successfully');
      readJsonFile(); // Optional: Read and log the updated data
    } else {
      console.error('Failed to add data to JSON file');
    }
  } catch (error) {
    console.error('Error adding data to JSON file in renderer process:', error);
  }
}
