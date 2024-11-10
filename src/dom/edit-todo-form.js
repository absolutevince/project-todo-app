import { verifyTodo } from "../utils/verification";
import pubsub from "../modules/pubsub";
import newFormattedDate from "../utils/new-date";

export default function editTodoForm(todo) {
  const form = document.createElement("form");
  const titleInput = document.createElement("input");
  const descInput = document.createElement("textarea");
  const dueDateInput = document.createElement("input");
  const prioInput = document.createElement("select");
  const submitButton = document.createElement("button");
  const cancelEdit = document.createElement("button");

  const dateAndPriorityDiv = document.createElement("div");

  dueDateInput.type = "date";

  form.id = "edit-todo-form";
  titleInput.className = "edit-todo-form-title";
  descInput.className = "edit-todo-form-description";
  dueDateInput.className = "edit-todo-form-due-date";
  prioInput.className = "edit-todo-form-priority";
  submitButton.className = "edit-todo-form-submit-button";
  dateAndPriorityDiv.className = "pair-input";

  const date = new Date(todo.dueDate);

  submitButton.textContent = "edit";
  cancelEdit.textContent = "cancel";
  titleInput.value = todo.title;
  descInput.value = todo.description;
  prioInput.value = todo.priority;
  dueDateInput.value = newFormattedDate(todo.dueDate);

  ["high", "regular", "low"].forEach((opt) => {
    const option = document.createElement("option");
    if (opt === todo.priority) {
      option.setAttribute("selected", true);
    }
    option.textContent = opt.slice(0, 1).toUpperCase() + opt.slice(1);
    option.value = opt;
    prioInput.appendChild(option);
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      verifyTodo({ title: titleInput.value, description: descInput.value }) ===
      false
    ) {
      return;
    }

    pubsub.publish("edit_todo", {
      title: titleInput.value,
      description: descInput.value,
      dueDate: Intl.DateTimeFormat().format(new Date(dueDateInput.value)),
      priority: prioInput.value,
      id: todo.id,
    });
  });

  cancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    form.remove();
  });

  dateAndPriorityDiv.append(dueDateInput, prioInput);
  form.append(
    titleInput,
    descInput,
    dateAndPriorityDiv,
    submitButton,
    cancelEdit
  );

  return form;
}
