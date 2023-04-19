import './style.css';
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

const dom = {
  splide: document.querySelector('.splide'),
};

const splide = new Splide(dom.splide, {
  speed: 2000,
  type: 'loop',
});
const bar = document.querySelector('.my-slider-progress-bar');

let ticking = false;

splide.on('mounted', () => {
  bar.style.width = String(100 * getRate()) + '%';
});

const getRate = () => {
  const { Layout, Move, Direction, Slides } = splide.Components;
  const position = Direction.orient(Move.getPosition());
  const base = Layout.sliderSize();
  let rate = 0;
  if (splide.options.type === 'loop')
    rate = Math.abs(Math.abs(position / base) - 1 / Slides.get(true).length);
  else rate = position / base + 1 / splide.length;
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
