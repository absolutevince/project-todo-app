export default (function animate() {
  function rotate(element, deg) {
    element.style.transform = `rotate(${deg}deg`;
  }

  return { rotate };
})();
