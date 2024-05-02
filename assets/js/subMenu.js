/************************************************************************\
                                 Sub menu
\************************************************************************/
var clickMenu = document.querySelectorAll('.leb__sub');

clickMenu.forEach(function (subMenu) {
   subMenu.addEventListener('click', function () {
   
      var subSpan = subMenu.querySelector('span');
   
      var clickedUl = event.target.nextElementSibling;
   
      clickedUl.classList.toggle('show-submenu');
      if (clickedUl.classList.contains('show-submenu')) {
      
         subSpan.classList.add('arrow-rotate');
      } else {
      
         subSpan.classList.remove('arrow-rotate');
      }
   });
});