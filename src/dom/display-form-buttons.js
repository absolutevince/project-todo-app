import ProjectForm from "./project-form";
import todoForm from "./todo-form";

export default (function displayFormButtons() {
  const createProjectButton = document.querySelector(".create-project-button");
  const createTodoButton = document.querySelector(".create-todo-button");

  function toggleProjectForm() {
    ProjectForm.toggleOpen();
  }

  function toggleTodoForm() {
    todoForm.toggleOpen();
  }

  return {
    init: () => {
      createProjectButton.addEventListener("click", toggleProjectForm);
      createTodoButton.addEventListener("click", toggleTodoForm);
    },
  };
})();
