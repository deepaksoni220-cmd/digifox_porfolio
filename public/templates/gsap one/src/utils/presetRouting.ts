export function applyPresetHashOnLoad() {
  const hash = window.location.hash;
  if (!hash) {
    window.location.hash = '';
  }
}
