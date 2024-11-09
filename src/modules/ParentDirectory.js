import DefaultProject from "./DefaultProject";
import Project from "./Project";

export default (function ParentDirectory() {
  const storageName = "projects";
  const defaultProjectName = "default";

  // init default project
  if (!getProjects()) {
    setProjects([new DefaultProject(defaultProjectName)]);
  }

  function createProject(name) {
    const project = new Project(name);
    setProjects([...getProjects(), project]);
  }

  function deleteProject(id) {
    const newProjectList = getProjects().filter((proj) => proj.id !== id);
    setProjects(newProjectList);
  }

  function getProjects() {
    return JSON.parse(localStorage.getItem(storageName));
  }

  function setProjects(value) {
    localStorage.setItem(storageName, JSON.stringify(value));
  }

  function setActiveProject(id) {
    const newProjectList = getProjects().map((proj) => {
      if (proj.id === id) {
        proj.activeStatus = true;
      } else {
        proj.activeStatus = false;
      }

      return proj;
    });

    setProjects(newProjectList);
  }

  function getActiveProject() {
    return getProjects()
      .filter((proj) => proj.activeStatus)
      .shift();
  }

  function saveTodo(todo) {
    const newProjectList = getProjects().map((proj) => {
      if (proj.activeStatus && proj.name !== defaultProjectName) {
        proj.todoIds.push(todo.id);
      }
      return proj;
    });

    //newProjectList[0] = "default" project
    newProjectList[0].allTodo.push(todo);

    setProjects(newProjectList);
  }

  function deleteTodo(id) {
    const newProjectList = getProjects().map((proj) => {
      /**  only the active project's todos shows at the DOM, by checking the
       * activeStatus if true means this code will always delete the correct todoId
       * from the correct project as well the todo object from default project
       * */
      if (proj.activeStatus && proj.name !== defaultProjectName) {
        proj.todoIds = proj.todoIds.filter((todoId) => todoId !== id);
      }

      return proj;
    });

    //newProjectList[0] = "default" project
    newProjectList[0].allTodo = newProjectList[0].allTodo.filter(
      (todo) => todo.id !== id
    );

    setProjects(newProjectList);
  }

  return {
    createProject,
    deleteProject,
    getActiveProject,
    setActiveProject,
    saveTodo,
    deleteTodo,
  };
})();
