import ParentDirectory from "../modules/Parent-directory";
import pubsub from "../modules/pubsub";
import { verifyTodo } from "../utils/verification";
import newFormattedDate from "../utils/new-date";

export default (function todoForm() {
  const form = document.querySelector("#todo-form");
  const titleInput = document.querySelector("#todo-form #title");
  const descInput = document.querySelector("#todo-form #description");
  const dueDateInput = document.querySelector("#todo-form #due-date");
  const prioInput = document.querySelector("#todo-form #priority");
  const submitButton = document.querySelector("#todo-form .submit-button");

  dueDateInput.value = newFormattedDate();

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      verifyTodo({ title: titleInput.value, description: descInput.value }) ===
      false
    ) {
      return;
    }

    pubsub.publish("create_todo", {
      title: titleInput.value,
      description: descInput.value,
      dueDate: Intl.DateTimeFormat().format(new Date(dueDateInput.value)),
      priority: prioInput.value,
      projectId: ParentDirectory.getActiveProject().id,
    });

    form.classList.add("hidden");
    titleInput.value = "";
    descInput.value = "";
    dueDateInput.value = newFormattedDate();
  });

  return {
    toggleOpen: () => form.classList.toggle("hidden"),
  };
})();
