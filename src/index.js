import "./style.css";
import displayProjectOptions from "./dom/display-project-options";
import createProjectButton from "./dom/create-project-button";
import pubsub from "./modules/pubsub";
import ParentDirectory from "./modules/Parent-directory";

// initializations

ParentDirectory.init();
displayProjectOptions.init();
createProjectButton.init();
