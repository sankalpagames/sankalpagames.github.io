// Close the Games dropdown on an outside click or Escape
document.addEventListener('click', (event) => {
  document.querySelectorAll('.games-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.games-menu[open]').forEach((menu) => menu.removeAttribute('open'));
});

// Fly the Planet Merge 2 planet across the screen at an angle every few seconds.
// Its layer moves with the page at PARALLAX of the scroll speed, so the planet lags behind the content.
const planet = document.querySelector('.flyby');
if (planet && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const PARALLAX = 0.35;
  const layer = planet.parentElement;
  const random = (min, max) => min + Math.random() * (max - min);
  const offset = () => scrollY * PARALLAX;

  const follow = () => layer.style.setProperty('--parallax', `${-offset()}px`);
  addEventListener('scroll', follow, { passive: true });
  follow();

  const fly = () => {
    const size = planet.offsetWidth;
    const fromLeft = Math.random() < 0.5;
    // Layer coordinates: shift by the current offset so the flight starts on screen
    const startY = random(0.15, 0.85) * innerHeight + offset();
    const endY = startY + random(-0.5, 0.5) * innerHeight;
    const startX = fromLeft ? -size : innerWidth;
    const endX = fromLeft ? innerWidth : -size;
    const spin = (fromLeft ? 1 : -1) * random(180, 420);

    planet.animate([
      { transform: `translate(${startX}px, ${startY}px) rotate(0deg)` },
      { transform: `translate(${endX}px, ${endY}px) rotate(${spin}deg)` },
    ], { duration: random(5000, 7000), easing: 'linear' })
      .finished.then(() => setTimeout(fly, random(6000, 10000)));
  };

  setTimeout(fly, 1500);
}
