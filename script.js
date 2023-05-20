'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const modalLogin = document.querySelector('.modal--login');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModalLogin = document.querySelector('.btn--close-modal--login');
const btnsOpenModalLogin = document.querySelector('.btn--show-modal--login');
const header = document.querySelector('header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const openLoginModal = function(e) {
  e.preventDefault();
  modalLogin.classList.remove('hidden');
  console.log(modalLogin)
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const closeModalLogin = function() {
  modalLogin.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnsOpenModalLogin.addEventListener('click',openLoginModal);

btnCloseModal.addEventListener('click', closeModal);
btnCloseModalLogin.addEventListener('click',closeModalLogin)
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.backgroundColor = '#37383d';
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it! </button></button>';
header.before(message);

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();

});*/

btnScrollTo.addEventListener('click', function(e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Navigation

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed

tabsContainer.addEventListener('click', function(e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== clicked) s.style.opacity = opacity;
    });
    logo.style.opacity = opacity;

  }
};

nav.addEventListener('mouseover', (e) => handleHover(e, 0.5));
nav.addEventListener('mouseout', (e) => handleHover(e, 1));

const stickyNav = function(entries) {
  const [entry] = entries;
  console.log(entry.isIntersecting);
  if (!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px'
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  /*
    section.classList.add('section--hidden');
  */
});


const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');

  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;

const slider = document.querySelector('.slider');

const createDots = function(){
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide=${i}></button>`)
  })
}

createDots();

const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

const goToSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);

}

slides.forEach((s, i) => s.style.transform = `translateX(${i * 100}%)`);
const nextSlide = function(e) {
  curSlide === slides.length - 1 ? curSlide = 0 : curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function(){
  curSlide !== 0 ? curSlide-- : curSlide = slides.length - 1 ;
  goToSlide(curSlide);
  activateDot(curSlide);

}
btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click',prevSlide)

document.addEventListener('keydown',function(e) {
  e.key === 'ArrowLeft' ? prevSlide() : nextSlide();
})

dotContainer.addEventListener('click',function(e) {
  if (e.target.classList.contains('dots__dot')){
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);

  }
})


console.log(localStorage.getItem('accounts'))