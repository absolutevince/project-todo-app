import DefaultProject from "./DefaultProject";
import Project from "./Project";

export default (function ParentDir() {
  const storageName = "projects";

  // init default project
  setProjects([new DefaultProject("default")]);

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

  return {
    createProject,
    deleteProject,
  };
})();
