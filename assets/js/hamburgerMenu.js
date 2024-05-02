/************************************************************************\
                                 HAMBURGER MENU
\************************************************************************/
let outClickAside = document.getElementById('leb__aside');
let outClickIcon = document.getElementById('nav__icon');
let navMenuItems = document.querySelectorAll('.leb__main-menu li [href^="#leb__"]');
let hamIcon = document.getElementById('nav__icon');
let isAsideActive = false;

function resetNavigationClasses() {
   isAsideActive = !isAsideActive;
   outClickAside.classList.toggle('nav__on', isAsideActive);
   nth1 = document.querySelector('span:nth-child(1)');
   nth1.classList.toggle('span_1-clicked', isAsideActive);
   nth2 = document.querySelector('span:nth-child(2)');
   nth2.classList.toggle('span_2-clicked', isAsideActive);
   nth3 = document.querySelector('span:nth-child(3)');
   nth3.classList.toggle('span_3-clicked', isAsideActive);
}

hamIcon.addEventListener('click', resetNavigationClasses);

document.addEventListener('click', function (event) {
   let target = event.target;
   if (isAsideActive && !outClickAside.contains(target) && !outClickIcon.contains(target)) {
      resetNavigationClasses();
   }
});

navMenuItems.forEach(function (menuItem) {
   menuItem.addEventListener('click', function (event) {
      resetNavigationClasses();
   });
});