// Sticky Navbar
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
});

// Show scrool btn when scroll down
window.addEventListener("scroll", function () {
  let scrool = document.querySelector("#scrool-up");
  scrool.classList.toggle("srcl", window.scrollY > 600);
});




// var i = 0;
// var jobtitle = ["Software Developer", "Technical Enthusiast", "Problem Solver", "Innovative Thinker", "Creative Developer"];
// var j=0;
// function textanimator(txt){
//   if(j<txt.length){
//   document.getElementById("jobtitle").innerHTML += txt.charAt(j);
//   j++;
//   setTimeout(textanimator(txt),50);
//   }else{
//     j=0;
//   }
// }

// function typeWriter() {
//   if (i < jobtitle.length) {
//     var txt=jobtitle[i];
//     document.getElementById("jobtitle").innerHTML="A ";
//     textanimator(txt);
//     i++;
//     setTimeout(typeWriter,50*txt.length);
//   }if(i==jobtitle.length){
//     i=0;
//     typeWriter();
//   }
// }
// typeWriter();

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
};


document.addEventListener('DOMContentLoaded', function () {
  // Get all navigation links and sections
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Function to remove active class from all links
  function removeActiveClasses() {
    navLinks.forEach((link) => link.classList.remove('active'));
  }

  // Function to add active class to the currently visible section's link
  function addActiveClass(entry) {
    const link = document.querySelector(`a[href="#${entry.target.id}"]`);
    link.classList.add('active');
  }

  // Intersection Observer options
  const options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.6, // 60% of the section must be visible to trigger
  };

  // Intersection Observer callback function
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeActiveClasses();
        addActiveClass(entry);
      }
    });
  };

  // Create a new Intersection Observer
  const observer = new IntersectionObserver(observerCallback, options);

  // Observe each section
  sections.forEach((section) => observer.observe(section));
});
