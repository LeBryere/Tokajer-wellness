/************************************************************************\
                                 Preload
\************************************************************************/
const preloader = document.getElementById("preloader");
const preloaderSvg = document.querySelector("#preloader svg");

preloader.style.opacity = 1;
preloader.style.transition = "opacity 700ms";
preloaderSvg.style.opacity = 0;

setTimeout(function () {
   preloaderSvg.style.opacity = 1;

   setTimeout(function () {
      preloader.style.opacity = 0;

      setTimeout(function () {
         preloader.style.display = "none";
      }, 500);

   }, 5000);

}, 500);