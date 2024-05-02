let leb__carousel, next, prev, items;
leb__carousel = document.querySelector('.leb__carousel');
items = document.querySelectorAll('.leb__carousel-item');

next = (el) => {
   // Check if there is a next element
   if (el.nextElementSibling !== null) {
      return el.nextElementSibling;
   } else {
      return items[0]; // If not, select the first element
   }
};

prev = (el) => {
   // Check if there is a previous element
   if (el.previousElementSibling !== null) {
      return el.previousElementSibling;
   } else {
      return items[items.length - 1]; // If not, select the last element
   }
};

// Add event listener to 'toggle' elements
document.querySelectorAll('.toggle').forEach((item) => {
   item.addEventListener('click', (e) => {
      let el, new_item;
      el = document.querySelector('.set-forward');
      el.classList.remove('set-forward'); // Remove previous 'set-forward' class

      // Use ternary operator to select the new element based on 'data-toggle' attribute
      new_item = (item.getAttribute('data-toggle') === 'next') ? next(el) : prev(el);

      // Toggle the 'moves-back' class on the 'leb__carousel' element based on the ternary operator
      leb__carousel.classList.toggle('moves-back', item.getAttribute('data-toggle') !== 'next');

      // Add the 'set-forward' class and set the 'order' property to 1 for the new element
      new_item.classList.add('set-forward');
      new_item.style.order = 1;

      // Set the 'order' property for the elements in the correct order
      for (let i = 2; i <= items.length; i++) {
         new_item = next(new_item);
         new_item.style.order = i;
      }

      // Remove and add the 'set-move' class to the 'leb__carousel' element with a delay
      leb__carousel.classList.remove('set-move');
      setTimeout(() => {
         leb__carousel.classList.add('set-move');
      }, 10);
   });

   // Add aria-label attribute to prev and next buttons
   if (item.getAttribute('data-toggle') === 'next') {
      item.setAttribute('aria-label', 'Next');
   } else {
      item.setAttribute('aria-label', 'Previous');
   }
});

// Keyboard navigation
document.addEventListener('keydown', function (ev) {
   var keyCode = ev.keyCode || ev.which;
   switch (keyCode) {
      case 37:
         nextSlide(); // Call the appropriate function to navigate to the next slide
         break;
      case 39:
         prevSlide(); // Call the appropriate function to navigate to the previous slide
         break;
   }
});

// Define a function for navigating to the next slide
function nextSlide() {
   // Get the currently displayed slide with the 'set-forward' class
   let currentSlide = document.querySelector('.set-forward');

   // Get the next slide using the 'next' function
   let newSlide = next(currentSlide);

   // Remove classes that control animation
   leb__carousel.classList.remove('moves-back');
   leb__carousel.classList.remove('set-move');

   // Remove 'set-forward' class from the current slide
   currentSlide.classList.remove('set-forward');

   // Add 'set-forward' class to the new slide and set its order to 1
   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   // Reorder the rest of the slides
   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }

   // Add the 'set-move' class with a slight delay to trigger the animation
   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}

// Define a function for navigating to the previous slide
function prevSlide() {
   // Get the currently displayed slide with the 'set-forward' class
   let currentSlide = document.querySelector('.set-forward');
   // Get the next slide using the 'prev' function
   let newSlide = prev(currentSlide);

   // Add classes that control animation
   leb__carousel.classList.add('moves-back');
   // Remove classes that control animation
   leb__carousel.classList.remove('set-move');

   // Remove 'set-forward' class from the current slide and set its order to 1
   currentSlide.classList.remove('set-forward');
   newSlide.classList.add('set-forward');
   newSlide.style.order = 1;

   // Reorder the rest of the slides
   for (let i = 2; i <= items.length; i++) {
      newSlide = next(newSlide);
      newSlide.style.order = i;
   }
   // Add the 'set-move' class with a slight delay to trigger the animation
   setTimeout(() => {
      leb__carousel.classList.add('set-move');
   }, 10);
}