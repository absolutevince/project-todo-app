import checkFormOpened from "../utils/check-form-opened";
import editTodoForm from "./edit-todo-form";
import pubsub from "../modules/pubsub";

export default function todoCard(todo) {
  const todoEl = document.createElement("article");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  const dueDate = document.createElement("span");
  const priority = document.createElement("span");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  const dateAndPriorityDiv = document.createElement("div");
  const editAndDeleteDiv = document.createElement("div");

  todoEl.className = "card";
  title.className = "card-title";
  desc.className = "card-description";
  dueDate.className = "card-due-date";
  priority.className = `card-priority ${todo.priority}`;
  editButton.className = "edit-button";
  deleteButton.className = "delete-button";
  dateAndPriorityDiv.className = "date-and-priority";
  editAndDeleteDiv.className = "edit-and-delete";

  todoEl.dataset.id = todo.id;
  title.textContent = todo.title;
  desc.textContent = todo.description;
  dueDate.textContent = todo.dueDate;
  priority.textContent = todo.priority;
  editButton.textContent = "edit";
  deleteButton.textContent = "delete";

  dateAndPriorityDiv.append(dueDate, priority);
  editAndDeleteDiv.append(editButton, deleteButton);
  todoEl.append(title, desc, dateAndPriorityDiv, editAndDeleteDiv);

  editButton.addEventListener("click", () => {
    if (checkFormOpened("#project-form") || checkFormOpened("#todo-form")) {
      return;
    }

    if (todoEl.querySelector("form") !== null) {
      todoEl.querySelector("form").remove();
    } else {
      todoEl.append(editTodoForm(todo));
    }
  });

  deleteButton.addEventListener("click", () => {
    pubsub.publish("delete_todo", todo.id);
  });

  return todoEl;
}
