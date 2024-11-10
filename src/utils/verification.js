export function verifyProject(name) {
  if (name.length <= 0) {
    return false;
  }
  return true;
}

export function verifyTodo({ title, description, dueDate }) {
  if (title.length <= 0 || description.length > 300) {
    return false;
  }
  return true;
}
