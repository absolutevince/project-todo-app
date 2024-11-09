import { v4 as uuidv4 } from "uuid";
import ParentDirectory from "./ParentDirectory";
import Todo from "./Todo";

export default class Project {
  constructor(name) {
    this.name = name;
    this.id = uuidv4();
    this.activeStatus = false;
    this.todoIds = [];
  }
}
