export default function todoCard(todo) {
  const todoEl = document.createElement("article");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  const dueDate = document.createElement("span");
  const priority = document.createElement("span");

  todoEl.className = "card";
  title.className = "card-title";
  desc.className = "card-description";
  dueDate.className = "card-due-data";
  priority.className = "card-priority";

  title.textContent = todo.title;
  desc.textContent = todo.description;
  dueDate.textContent = todo.dueDate;
  priority.textContent = todo.priority;

  todoEl.append(title, desc, dueDate, priority);

  return todoEl;
}
