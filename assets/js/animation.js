/************************************************************************\
                                 Leb animation
\************************************************************************/
document.addEventListener('DOMContentLoaded', function () {
   "use strict";
   var wind = window;

   var contentWayPoint = function () {
      var animateBoxes = document.querySelectorAll('.animate-img');

      var waypointCallback = function (entries) {
         entries.forEach(function (entry, index) {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
               entry.target.classList.add('animated', 'item-animate');
               var currentItem = entry.target;
               var animationDelay = 100;
               var animationDuration = 1000;
               var delay = (index + 1) * animationDelay;

               setTimeout(function () {
                  var itemAnimateBoxes = document.querySelectorAll('body .animate-img.animated.item-animate');
                  itemAnimateBoxes.forEach(function (el, k) {
                     if (el === currentItem) {
                        var effect = el.getAttribute('data-animate-effect');
                        el.style.animationDelay = delay + 'ms';
                        el.style.animationDuration = animationDuration + 'ms';

                        if (effect) {
                           el.classList.add(effect);
                        }

                        el.classList.remove('item-animate');
                     }
                  });
               }, 100);
            }
         });
      };

      var observer = new IntersectionObserver(waypointCallback, { rootMargin: '20px' });
      animateBoxes.forEach(function (box) {
         observer.observe(box);
      });
   };

   contentWayPoint();

   var lastScrollTop = 0;

   window.addEventListener('scroll', function () {
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
         var animateBoxes = document.getElementsByClassName('animate-img');

         for (var i = 0; i < animateBoxes.length; i++) {
            var animateBox = animateBoxes[i];
            var rect = animateBox.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top > windowHeight + 20) {
               animateBox.classList.remove('animated', 'fadeIn', 'fadeInUp', 'fadeInLeft', 'fadeInRight');
            }
         }
      }

      lastScrollTop = st;
   });
});