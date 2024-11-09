import pubsub from "../modules/pubsub";
import ProjectForm from "./project-form";

export default (function createProjectButton() {
  const button = document.querySelector(".create-project-button");

  function click() {
    ProjectForm.toggleOpen();
  }

  return {
    init: () => button.addEventListener("click", click),
  };
})();
