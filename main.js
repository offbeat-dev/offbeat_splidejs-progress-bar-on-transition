import './style.css';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

const splide = new Splide('.splide', {
  speed: 1500,
});
const bar = document.querySelector('.my-slider-progress-bar');

let ticking = false;

splide.on('mounted', () => {
  bar.style.width = String(100 * getRate()) + '%';
});

const getRate = () => {
  const { Layout, Move, Direction } = splide.Components;
  const position = Direction.orient(Move.getPosition());
  const base = Layout.sliderSize();
  const rate = position / base + 1 / splide.length;
  return rate;
};

document
  .querySelector('.splide__list')
  .addEventListener('transitionend', (event) => {
    console.log('transition end');
    ticking = false;
  });

document
  .querySelector('.splide__list')
  .addEventListener('transitionstart', (event) => {
    console.log('transition start');
    ticking = true;
    requestAnimationFrame(raf);
  });

splide.on('dragging dragged', () => {
  bar.style.width = String(100 * getRate()) + '%';
});
splide.mount();

const raf = (time) => {
  bar.style.width = String(100 * getRate()) + '%';
  if (ticking) requestAnimationFrame(raf);
};
