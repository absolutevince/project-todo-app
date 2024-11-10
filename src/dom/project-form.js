import pubsub from "../modules/pubsub";

export default (function ProjectForm() {
  const form = document.querySelector("#project-form");
  const nameInput = document.querySelector("#project-form .name-input");
  const createProjectButton = document.querySelector(
    "#project-form .submit-button"
  );

  createProjectButton.addEventListener("click", (e) => {
    e.preventDefault();
    pubsub.publish("create_project", nameInput.value);

    form.classList.add("hidden");
    nameInput.value = "";
  });

  return {
    toggleOpen: () => form.classList.toggle("hidden"),
  };
})();
