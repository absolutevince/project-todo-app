import checkFormOpened from "../utils/check-form-opened";
import ProjectForm from "./project-form";
import todoForm from "./todo-form";

export default (function displayFormButtons() {
  const createProjectButton = document.querySelector(".create-project-button");
  const createTodoButton = document.querySelector(".create-todo-button");

  function toggleProjectForm() {
    if (checkFormOpened("#todo-form")) return;
    ProjectForm.toggleOpen();
  }

  function toggleTodoForm() {
    if (checkFormOpened("#project-form")) return;
    todoForm.toggleOpen();
  }

  return {
    init: () => {
      createProjectButton.addEventListener("click", toggleProjectForm);
      createTodoButton.addEventListener("click", toggleTodoForm);
    },
  };
})();
