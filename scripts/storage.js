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
