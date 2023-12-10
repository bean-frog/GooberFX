

let selects = document.querySelectorAll('.file-select');
var availablefiles;

async function fetchData() {
  try {
    availablefiles = await getFilenames();
    console.log("available:", availablefiles);
    updateSelectOptions();

  } catch (error) {
    console.error('Error fetching filenames:', error);
  }
}

fetchData();

function updateSelectOptions() {
  selects.forEach((select) => {
    select.innerHTML = '';
    availablefiles.forEach((filename) => {
      const option = document.createElement('option');
      option.textContent = filename;
      select.appendChild(option);
    });
  });
}
document.getElementById('updateList').addEventListener('click', fetchData);
var audioElements = {};
for (var i = 1; i <= 4; i++) {
    audioElements[i] = document.getElementById('audio-' + i);
}
function playAudio(filename, channel) {
    var channelKey = 'channel' + channel;
    var containerClass = 'channel-' + channel;
    if (!audioElements[channelKey]) {
        audioElements[channelKey] = document.createElement('audio');
        audioElements[channelKey].setAttribute('controls', true);
                audioElements[channelKey].style.width = '300px';
        audioElements[channelKey].classList.add('m-4', 'self-center')
        var containerElement = document.querySelector('.' + containerClass);
        if (containerElement) {
            containerElement.appendChild(audioElements[channelKey]); // Append to the container element
        } else {
            console.error('Container element not found for channel ' + channel);
        }
    } else {
        audioElements[channelKey].pause();
        audioElements[channelKey].currentTime = 0;
    }

    audioElements[channelKey].src = '../sounds/' + filename;
    audioElements[channelKey].play();
}

function pauseAudio(channel) {
    var channelKey = 'channel' + channel;
    
    if (audioElements[channelKey]) {
        audioElements[channelKey].pause();
    }
}

function clearAudio(channel) {
    var channelKey = 'channel' + channel;
    
    if (audioElements[channelKey]) {
        audioElements[channelKey].pause();
        audioElements[channelKey].removeAttribute('src');
        audioElements[channelKey] = null;
    }
}


function addCue(name, filename) {
    console.log('name:' + name + ', path:' + filename)
    let html = `
    <div class="flex justify-between p-4 bg-gray-100 rounded dark:bg-gray-700 draggable-card">
        <div class="flex items-center"> <!-- Added flex and items-center class -->
            <div>
                <h3 contenteditable class="font-bold">${name}</h3>
                <p class="text-xs text-gray-500">${filename}</p>
            </div>
            <button 
                class="px-4 py-2 ml-4 text-white bg-sky-500 rounded hover:scale-[1.01] hover:shadow-md active:scale-95"
                onclick="playAudio('${filename}', 1)">
                Play (Ch. 1)
            </button>
            <button 
                class="px-4 py-2 ml-4 text-white bg-sky-500 rounded hover:scale-[1.01] hover:shadow-md active:scale-95"
                onclick="playAudio('${filename}', 2)">
                Play (Ch. 2)
            </button>
            <button 
                class="px-4 py-2 ml-4 text-white bg-sky-500 rounded hover:scale-[1.01] hover:shadow-md active:scale-95"
                onclick="playAudio('${filename}', 3)">
                Play (Ch. 3)
            </button>
            <button 
                class="px-4 py-2 ml-4 text-white bg-sky-500 rounded hover:scale-[1.01] hover:shadow-md active:scale-95"
                onclick="playAudio('${filename}', 4)">
                Play (Ch. 4)
            </button>
            
        </div>
        <div class="flex space-x-4">
            <button class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                Delete
            </button>
        </div>
    </div>
`

    document.getElementById('cuelist').insertAdjacentHTML('beforeend', html)
}
function specialAudio(fullpath, channel) {
    var channelKey = 'channel' + channel;
    var containerClass = 'channel-' + channel;
    if (!audioElements[channelKey]) {
        audioElements[channelKey] = document.createElement('audio');
        audioElements[channelKey].setAttribute('controls', true);
                audioElements[channelKey].style.width = '300px';
        audioElements[channelKey].classList.add('m-4', 'self-center')
        var containerElement = document.querySelector('.' + containerClass);
        if (containerElement) {
            containerElement.appendChild(audioElements[channelKey]); // Append to the container element
        } else {
            console.error('Container element not found for channel ' + channel);
        }
    } else {
        audioElements[channelKey].pause();
        audioElements[channelKey].currentTime = 0;
    }

    audioElements[channelKey].src = fullpath;
    audioElements[channelKey].play();
}
function calibration() {
    specialAudio('../calibration/calibration.mp3', 1);
    specialAudio('../calibration/calibration.mp3', 2);
    specialAudio('../calibration/calibration.mp3', 3);
    specialAudio('../calibration/calibration.mp3', 4);

}


//initializes all 4 channels with a blank mp3, so taht tehy actually appear
document.addEventListener('DOMContentLoaded', function() {
    specialAudio('../calibration/empty.mp3', 1);
    specialAudio('../calibration/empty.mp3', 2);
    specialAudio('../calibration/empty.mp3', 3);
    specialAudio('../calibration/empty.mp3', 4);
})