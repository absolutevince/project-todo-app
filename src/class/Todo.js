import { v4 as uuidv4 } from "uuid";

export default class Todo {
  constructor(title, description, dueDate, pririoty, projectId) {
    this.title = title;
    this.description = description;
    this.id = uuidv4();
    this.dueDate = dueDate;
    this.pririoty = pririoty;
    this.projectId = projectId;
  }
}
