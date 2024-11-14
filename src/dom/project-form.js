import pubsub from "../modules/pubsub";
import { verifyProject } from "../utils/verification";

export default (function ProjectForm() {
  const form = document.querySelector(".create-project-form");
  const nameInput = document.querySelector(".create-project-form .name-input");
  const createProjectButton = document.querySelector(
    ".create-project-form .submit-button"
  );
  let isOpened = false;

  createProjectButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (verifyProject(nameInput.value) === false) return;
    pubsub.publish("create_project", nameInput.value);

    form.classList.add("hidden");
    nameInput.value = "";
  });

  return {
    toggleOpen: () => {
      form.classList.toggle("hidden");
      isOpened = !isOpened;
      console.log(isOpened);
    },
    isOpened: () => isOpened,
  };
})();
