import "./style.css";
import ParentDirectory from "./modules/Parent-directory";
import displayProjectOptions from "./dom/display-project-options";
import displayFormButtons from "./dom/display-form-buttons";
import pubsub from "./modules/pubsub";
import displayTodoCards from "./dom/display-todo-cards";

// initializations

ParentDirectory.init();
displayProjectOptions.init();
displayFormButtons.init();
displayTodoCards.init();
