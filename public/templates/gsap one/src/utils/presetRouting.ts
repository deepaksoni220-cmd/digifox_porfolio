export function applyPresetHashOnLoad() {
  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '';
  }
}

export function routeHref(route: string): string {
  return `#${route}`;
}

export function navigateToRoute(route: string) {
  window.location.hash = route;
}
