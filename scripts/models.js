export class ToDoList {
  constructor({ id, title, tasks = [] }) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}

export class Task {
  constructor({ id, name = "", isCompleted = false, tag = "" }) {
    this.id = id;
    this.name = name;
    this.isCompleted = isCompleted;
    this.tag = tag;
  }
}
