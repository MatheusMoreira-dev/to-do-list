export class ToDoList {
  constructor({ id, title, toDo = [], completed = [] }) {
    this.id = id;
    this.title = title;
    this.toDo = toDo;
    this.completed = completed;
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
