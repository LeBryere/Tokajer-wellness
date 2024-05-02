/************************************************************************\
                                 Rooms slider
\************************************************************************/
(function () {

   function init(item) {
      var items = item.querySelectorAll('li'),
         current = 0,
         autoUpdate = true,
         timeTrans = 600000;

      var sliderNav = document.createElement('slider-nav');
      sliderNav.className = 'nav-arrows';

      var prevbtn = document.createElement('button');
      prevbtn.className = 'prev flaticon-back';
      prevbtn.setAttribute('aria-label', 'Prev');

      var nextbtn = document.createElement('button');
      nextbtn.className = 'next flaticon-next';
      nextbtn.setAttribute('aria-label', 'Next');

      var counter = document.createElement('div');
      counter.className = 'counter';
      counter.innerHTML = "<span>1</span><span>" + items.length + "</span>";

      if (items.length > 1) {
         sliderNav.appendChild(prevbtn);
         sliderNav.appendChild(counter);
         sliderNav.appendChild(nextbtn);
         item.appendChild(sliderNav);
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

         var nextCurrent = current < items.length - 1 ? current + 1 : 0,
            prevCurrent = current > 0 ? current - 1 : items.length - 1;

         items[current].className = "current";
         items[prevCurrent].className = "prev-slider";
         items[nextCurrent].className = "";

         counter.firstChild.textContent = current + 1;
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
               /* left swipe */
               navigate('right');
            } else {
               navigate('left');
            }
         }
         /* reset values */
         xDown = null;
         yDown = null;
      };
   }

   [].slice.call(document.querySelectorAll('.leb__room-slider')).forEach(function (item) {
      init(item);
   });
})();
