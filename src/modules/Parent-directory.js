import DefaultProject from "../class/DefaultProject";
import Project from "../class/Project";
import Todo from "../class/Todo";
import pubsub from "./pubsub";

export default (function ParentDirectory() {
  const storageName = "projects";
  const defaultProjectName = "default";

  function createProject(name) {
    const project = new Project(name);
    setProjects([...getProjects(), project]);
    setActiveProject(project.id);
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

  function createTodo({ title, description, dueDate, priority, projectId }) {
    const t = new Todo(title, description, dueDate, priority, projectId);
    const newProjectList = getProjects().map((proj) => {
      return proj;
    });
    //newProjectList[0] = "default" project
    newProjectList[0].allTodo.push(t);
    setProjects(newProjectList);
    console.log(getProjects());
  }

  function editTodo({ title, description, dueDate, priority, id }) {
    const newProjectList = getProjects().map((proj) => {
      if (proj.id === getProjects()[0].id) {
        proj.allTodo = proj.allTodo.map((todo) => {
          if (todo.id === id) {
            todo = { ...todo, title, description, dueDate, priority };
          }

          return todo;
        });
      }
      return proj;
    });

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

  function getAllTodo() {
    const defaultProject = getProjects()[0];
    const activeProjectId = getActiveProject().id;
    function filterTodo() {
      return defaultProject.allTodo.filter(
        (todo) => todo.projectId === activeProjectId
      );
    }

    return getActiveProject().id !== defaultProject.id
      ? filterTodo()
      : defaultProject.allTodo;
  }

  return {
    getProjects,
    getActiveProject,
    setActiveProject,
    getAllTodo,
    init: () => {
      // init default project
      if (!getProjects()) {
        setProjects([new DefaultProject(defaultProjectName)]);
      }
      // PUBSUBS
      pubsub.sub("create_project", createProject);
      pubsub.sub("delete_project", deleteProject);
      pubsub.sub("activate_project", setActiveProject);
      pubsub.sub("create_todo", createTodo);
      pubsub.sub("edit_todo", editTodo);
      pubsub.sub("delete_todo", deleteTodo);
    },
  };
})();
