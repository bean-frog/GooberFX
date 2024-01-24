# GooberFX
Theatre oriented sound effect application. Not amazing but it works (probably) <br>
supposedly lightweight but it uses electron so idk about that <br>
it runs on my cheap ass thinkpad though so it must be alright 🤷‍♂️ <br>
written and tested on Linux, probably works on mac or windows because electron 
 ## to use:
 - probably not gonna build it because its annoying
 - so you have to run it from source
 - install npm and nodejs
 - download and unzip the code
 - go to the folder where it is
 - run npm install
 - run npm run start
 - uhhhhh enjoy the worst app ever created
 - put any files you want to use in the ./sounds folder btw
 - data.json stores the cues, you can edit it manually just make sure the formatting is correct
## how to do stuff with this terrible app
 - you can change the playback speed and volume of whatever plays or is playing using the audio track display in each channel at the top of the screen.
 - to add sounds open whatever folder this app is extracted into and drag audio files into ./sounds and then they will be available in the add cue menu.
 - What all the buttons do:
    - calibration sweep: plays a 20-20,000hz sweep on all 4 channels to test stuff i guess
    - stop all: force stops all channels in case you accidentally play a moaning sound in a church or something
    - add cue: opens a modal to add a new cue. Inside this modal you can choose a name, and a sound file from a dropdown menu. the dropdown populates from the ./sounds folder and you can refresh the list with the button below.
    - stop (on each channel dsplay): stop just that channel
    - Play (ch 1-4) on each cue: play this cue on the selected channel. so you can have up to 4 things playing at once. (this was originally two, no need to thank me but you're welcome)
    - Delete (on each cue): delete this cue.
## Screenshots
#### No cues added yet:
![screenshot of the gooberfx interface with no cues added](https://github.com/bean-frog/GooberFX/blob/main/readmeimgs/nocues.png?raw=true)
#### A few cues added:
![screenshot of the gooberfx interface with some cues](https://github.com/bean-frog/GooberFX/blob/main/readmeimgs/somecues.png?raw=true)

