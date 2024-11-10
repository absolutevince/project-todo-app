import ParentDirectory from "../modules/Parent-directory";
import pubsub from "../modules/pubsub";

export default (function todoForm() {
  const form = document.querySelector("#todo-form");
  const titleInput = document.querySelector("#todo-form #title");
  const descInput = document.querySelector("#todo-form #description");
  const dueDateInput = document.querySelector("#todo-form #due-date");
  const prioInput = document.querySelector("#todo-form #priority");
  const submitButton = document.querySelector("#todo-form .submit-button");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log({
      title: titleInput.value,
      description: descInput.value,
      dueDate: dueDateInput.value,
      prority: prioInput.value,
      projectId: ParentDirectory.getActiveProject().id,
    });
    pubsub.publish("create_todo", {
      title: titleInput.value,
      description: descInput.value,
      dueDate: dueDateInput.value,
      prority: prioInput.value,
      projectId: ParentDirectory.getActiveProject().id,
    });

    form.classList.add("hidden");
    titleInput.value = "";
    descInput.value = "";
    dueDateInput.value = "";
    prioInput.value = "";
  });

  return {
    toggleOpen: () => form.classList.toggle("hidden"),
  };
})();
