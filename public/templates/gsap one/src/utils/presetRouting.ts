import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function applyPresetHashOnLoad() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        gsap.to(window, { duration: 1, scrollTo: hash, ease: 'power3.inOut' });
      }, 100);
    }
  }
}

export function routeHref(route: string): string {
  return `#${route}`;
}

export function navigateToRoute(route: string) {
  const target = route ? `#${route}` : 'body';
  const element = document.querySelector(target);
  if (element) {
    gsap.to(window, { duration: 1, scrollTo: { y: element, offsetY: 0 }, ease: 'power3.inOut' });
    window.history.pushState(null, '', route ? `#${route}` : ' ');
  }
}

