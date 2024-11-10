import ParentDirectory from "../modules/Parent-directory";
import pubsub from "../modules/pubsub";
import todoCard from "./todo-card";

export default (function displayTodoCards() {
  const container = document.querySelector(".card-container");

  function displayCards() {
    const todoItems = ParentDirectory.getAllTodo();
    const activeProjectId = ParentDirectory.getActiveProject().id;

    container.innerHTML = "";
    todoItems.forEach((todo) => {
      const li = document.createElement("li");
      li.append(todoCard(todo));
      container.append(li);
    });
  }

  return {
    init: () => {
      pubsub.sub("create_project", displayCards);
      pubsub.sub("create_todo", displayCards);
      pubsub.sub("activate_project", displayCards);
      pubsub.sub("edit_todo", displayCards);
      displayCards();
    },
  };
})();
