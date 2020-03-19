export const units = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400
};

/**
 * Ensures that an element fits exactly inside the window
 */
export const scaleToWindow = el => {
  const ratio = Math.max(el.clientWidth / window.innerWidth, el.clientHeight / window.innerHeight);
  el.style.transform = `scale(${1 / ratio})`;
};
