export default function checkFormOpened(querySelector) {
  const form = document.querySelector(querySelector);

  return form.classList.contains("hidden") !== true;
}
