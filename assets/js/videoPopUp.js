let openPopupButton = document.getElementById("openPopupButton");
let closeButton = document.getElementById("closeButton");
let vid = document.getElementById("leb__bg_vid");
let videoPopup = document.getElementById("videoPopup");
let pauseButton = document.querySelector("#lebVid button");

// Event listener for the "openPopupButton" button to open the popup
openPopupButton.addEventListener("click", () => {
   videoPopup.style.display = "flex"; // Display the popup
   // Set the text of the "Pause" button to "Pause"
   vid.paused ? (vid.play(), pauseButton.innerHTML = "||") : null;
});

// Event listener for the "closeButton" button to close the popup
closeButton.addEventListener("click", () => {
   videoPopup.style.display = "none"; // Hide the popup
   vid.pause()
});

pauseButton.addEventListener("click", () => {
   // Event listener for the "Pause" button
   // If the video is paused, play it and set the text of the "Pause" button to "Pause"
   // In the else branch, stop the video, and change the text of the "Pause" button to "Play"
   vid.paused ? (vid.play(), pauseButton.innerHTML = "||") : (vid.pause(), pauseButton.innerHTML = "Play")
});

muteButton.addEventListener("click", () => {
   // Event listener for the "muteButton" button
   // Toggle the "muted" attribute of the video to mute/unmute it
   vid.muted = !vid.muted;
   // Change the button text based on the sound state
   if (vid.muted) {
      muteButton.innerHTML = "Sound"
      muteButton.style.backgroundColor = "transparent";
      muteButton.style.color = "$design";
   } else {
      muteButton.innerHTML = "Sound"
      muteButton.style.color = "#fff";
   }
});

document.addEventListener("DOMContentLoaded", () => {
   let fullscreenButton = document.getElementById("fullscreenButton");

   (window.matchMedia("(orientation: landscape)").matches) ?
      lebVid.style.top = "3rem" :
      lebVid.style.top = "inherit"; // Reset to default value (no "top" set)

   fullscreenButton.addEventListener("click", () => {
      let lebVid = document.getElementById("lebVid");

      vid.requestFullscreen ?
         vid.requestFullscreen() :
         vid.mozRequestFullScreen ? // Firefox support
            vid.mozRequestFullScreen() :
            vid.webkitRequestFullscreen ? // Chrome, Safari, and Opera support
               vid.webkitRequestFullscreen() :
               vid.msRequestFullscreen ? // Internet Explorer support
                  vid.msRequestFullscreen() :
                  null
   });

   // Orientation change event listener
   window.addEventListener("orientationchange", () => {
      let lebVid = document.getElementById("lebVid");

      window.matchMedia("(orientation: landscape)").matches ?
         lebVid.style.top = "auto" :
         lebVid.style.top = "3rem"; // Reset to default value (no "top" set)
   });
});