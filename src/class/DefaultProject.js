import Project from "./Project";

export default class DefaultProject extends Project {
  constructor(name) {
    super(name);
    this.activeStatus = true;
    this.allTodo = [];
  }
}
