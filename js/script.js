const counterSection = document.querySelector("#counter");
const activeItems = document.querySelectorAll("nav a.active");

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const obj1 = document.querySelector(".counter-850");
const obj2 = document.querySelector(".counter-230");
const obj3 = document.querySelector(".counter-9450");
const obj4 = document.querySelector(".counter-780");

const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1, // Trigger when at least 10% of the section is in view
};

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateValue(obj1, 0, 850, 3000);
      animateValue(obj2, 0, 230, 3000);
      animateValue(obj3, 0, 9450, 3000);
      animateValue(obj4, 0, 780, 3000);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, observerOptions);
observer.observe(counterSection);

// for text animation
let TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-rotate");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

//  to solve the active class problem in navbar
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listener to all nav links
  const navLinks = document.querySelectorAll("nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove 'active' class from all nav items
      document.querySelector(".nav-link.active").classList.remove("active");
      // Add 'active' class to the clicked nav item
      this.classList.add("active");
    });
  });

  // Remove 'active' class and 'aria-current' attribute from all active list items
  const activeItems = document.querySelectorAll("nav a.active");
  activeItems.forEach((item) => {
    item.classList.remove("active");
    item.removeAttribute("aria-current");
  });

  // Add 'active' class and 'aria-current' attribute to the list item matching the current path
  const currentPath = location.pathname;
  const currentLink = document.querySelector('a[href="' + currentPath + '"]');
  if (currentLink) {
    const listItem = currentLink.closest(".nav-link");
    if (listItem) {
      listItem.classList.add("active");
      listItem.setAttribute("aria-current", "page");
    }
  }
});
