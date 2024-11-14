import checkFormOpened from "../utils/check-form-opened";
import ProjectForm from "./project-form";
import todoForm from "./todo-form";
import animate from "./animate";
import projectForm from "./project-form";

export default (function displayFormButtons() {
  const createProjectButton = document.querySelector(".create-project-button");
  const createTodoButton = document.querySelector(".create-todo-button");

  function toggleProjectForm() {
    if (checkFormOpened(".todo-form")) return;
    ProjectForm.toggleOpen();
    console.log(projectForm.isOpened());
    if (projectForm.isOpened()) {
      animate.rotate(createProjectButton, 45);
    } else {
      animate.rotate(createProjectButton, 0);
    }
  }

  function toggleTodoForm() {
    if (checkFormOpened(".create-project-form")) return;
    todoForm.toggleOpen();
  }

  return {
    init: () => {
      createProjectButton.addEventListener("click", toggleProjectForm);
      createTodoButton.addEventListener("click", toggleTodoForm);
    },
  };
})();
