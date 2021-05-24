const display = document.getElementById('display-input');

export function toggleScroll() {
  display.scrollLeft = display.scrollWidth;
}