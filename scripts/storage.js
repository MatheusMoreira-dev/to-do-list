export class ToDoStorage {
  static key = "to-do-list";

  static refreshStorage(updateList) {
    localStorage.setItem(ToDoStorage.key, JSON.stringify(updateList));
  }

  static getAll() {
    const items = localStorage.getItem(ToDoStorage.key);

    return items ? JSON.parse(items) : [];
  }

  static add(toDoList) {
    const all = this.getAll();
    toDoList["id"] = crypto.randomUUID();

    all.push(toDoList);

    this.refreshStorage(all);
  }

  static delete(id) {
    const all = this.getAll();
    const foundIndex = all.findIndex((v) => v.id == id);

    if (foundIndex != -1) all.splice(foundIndex, 1);
    this.refreshStorage(all);
  }

  static patch(id, payload) {
    const all = this.getAll();
    const foundIndex = all.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) all[foundIndex][key] = payload[key];
      this.refreshStorage(all);
    }

    return all[foundIndex];
  }
}

export class TaskStorage {
  static key = "tasks";

  static refreshStorage(updateList) {
    localStorage.setItem(TaskStorage.key, JSON.stringify(updateList));
  }

  static getAll() {
    const items = localStorage.getItem(TaskStorage.key);

    return items ? JSON.parse(items) : [];
  }

  static add(task) {
    const allTasks = this.getAll();
    task["id"] = crypto.randomUUID();

    allTasks.push(task);

    this.refreshStorage(allTasks);
  }

  static delete(id) {
    const tasks = this.getAll();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) tasks.splice(foundIndex, 1);
    this.refreshStorage(tasks);
  }

  static patch(id, payload) {
    const tasks = this.getAll();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) tasks[foundIndex][key] = payload[key];
      this.refreshStorage(tasks);
    }

    return tasks[foundIndex];
  }
}
