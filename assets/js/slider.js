/************************************************************************\
                                 Leb Slider
\************************************************************************/
(function () {

   function init(item) {

      var items = item.querySelectorAll('li'),

         current = 0,
         autoUpdate = true,
         timeTrans = 500000;

      var nav = document.createElement('nav');
      nav.className = 'nav_arrows';

      var prevbtn = document.createElement('div');
      prevbtn.className = 'prev';
      prevbtn.setAttribute('aria-label', 'Prev');
      prevbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="24.67,34.59 11.653,17.464 24.67,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="13.688,34.59 0.671,17.464 13.688,0.338 "></polyline></svg>`

      var nextbtn = document.createElement('div');
      nextbtn.className = 'next';
      nextbtn.setAttribute('aria-label', 'Next');
      nextbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25.109px" height="34.906px" viewBox="0 0 25.109 34.906" enable-background="new 0 0 25.109 34.906" xml:space="preserve"><polyline fill="none" stroke="" stroke-miterlimit="10" points="0.442,34.59 13.459,17.464 0.442,0.338 "></polyline><polyline fill="none" class="popout" stroke="" stroke-miterlimit="10" points="11.425,34.59 24.441,17.464 11.425,0.338 "></polyline></svg>`

      if (items.length > 1) {
         nav.appendChild(prevbtn);
         nav.appendChild(nextbtn);
         item.appendChild(nav);
      }

      items[current].className = "current";
      if (items.length > 1) items[items.length - 1].className = "prev-slider";

      var navigate = function (dir) {
         items[current].className = "";

         if (dir === 'right') {
            current = current < items.length - 1 ? current + 1 : 0;
         } else {
            current = current > 0 ? current - 1 : items.length - 1;
         }

         var nextCurrent = current < items.length - 1 ? current + 1 : 0;
         var prevCurrent = current > 0 ? current - 1 : items.length - 1;

         items[current].className = "current";
         items[prevCurrent].className = "prev-slider";
         items[nextCurrent].className = "";
      }

      item.addEventListener('mouseenter', function () {
         autoUpdate = false;
      });
      item.addEventListener('mouseleave', function () {
         autoUpdate = true;
      });

      setInterval(function () {
         if (autoUpdate) navigate('right');
      }, timeTrans);

      prevbtn.addEventListener('click', function () {
         navigate('left');
      });

      nextbtn.addEventListener('click', function () {
         navigate('right');
      });

      //keyboard navigation
      document.addEventListener('keydown', function (ev) {
         var keyCode = ev.keyCode || ev.which;
         switch (keyCode) {
            case 37:
               navigate('left');
               break;
            case 39:
               navigate('right');
               break;
         }
      });

      item.addEventListener('touchstart', handleTouchStart, false);
      item.addEventListener('touchmove', handleTouchMove, false);
      var xDown = null;
      var yDown = null;

      function handleTouchStart(evt) {
         xDown = evt.touches[0].clientX;
         yDown = evt.touches[0].clientY;
      };

      function handleTouchMove(evt) {
         if (!xDown || !yDown) {
            return;
         }

         var xUp = evt.touches[0].clientX;
         var yUp = evt.touches[0].clientY;

         var xDiff = xDown - xUp;
         var yDiff = yDown - yUp;

         if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
               navigate('right');
            } else {
               navigate('left');
            }
         }

         xDown = null;
         yDown = null;
      };

   }
   [].slice.call(document.querySelectorAll('.leb__slider')).forEach(function (item) {
      init(item);
   });
   document.getElementsByClassName
})();

/************************************************************************\
                           Leb Slider animation
\************************************************************************/
var elemek = document.querySelectorAll('.leb__slider ul li');
var observer = new MutationObserver(function (mutations) {
   mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
         var currentElem = mutation.target;
         var leb__sliderInners = currentElem.querySelectorAll('.animate-box');
         leb__sliderInners.forEach(function (leb__sliderInner, index) {
            removeAnimateEffectClasses(leb__sliderInner);
            if (currentElem.classList.contains('current')) {
               var animateEffect = leb__sliderInner.getAttribute('animate-effect');
               if (animateEffect) {
                  var delay = (index + 1) * 0.4;
                  leb__sliderInner.style.animationDelay = delay + 's';

                  leb__sliderInner.classList.add(animateEffect);
                  leb__sliderInner.classList.add('animated');
               }
            }
         });

         var lebImages = currentElem.querySelectorAll('.leb__image')
         lebImages.forEach(function (lebImage) {
            removeZoomEffectClasses(lebImage);
            if (currentElem.classList.contains('current')) {
               var zoomEffect = lebImage.getAttribute('zoom-image')
               if (zoomEffect) {
                  lebImage.classList.add(zoomEffect)
                  lebImage.classList.add('zoomtime')
               }
            }
         })
      }
   });
});

elemek.forEach(function (elem) {
   observer.observe(elem, { attributes: true });
});

function removeAnimateEffectClasses(leb__sliderInner) {
   var animateEffect = leb__sliderInner.getAttribute('animate-effect');
   if (animateEffect) {
      leb__sliderInner.classList.remove(animateEffect);
      leb__sliderInner.classList.remove('animated');
   }
}

function removeZoomEffectClasses(lebImage) {
   var zoomEffect = lebImage.getAttribute('zoom-image');
   if (zoomEffect) {
      lebImage.classList.remove(zoomEffect);
      lebImage.classList.remove('zoomtime');
   }
}
