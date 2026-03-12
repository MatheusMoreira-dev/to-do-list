export class TaskStorage {
  static key = "tasks";

  static structure = {
    "to-do": [],
    completed: [],
  };

  static getStorage() {
    const items = localStorage.getItem(TaskStorage.key);

    return items ? JSON.parse(items) : [];
  }

  static getToDo() {
    return this.getStorage()["to-do"];
  }

  static getCompleted() {
    return this.getStorage()["completed"];
  }

  static refreshToDo(updateList) {
    const all = this.getStorage();
    all["to-do"] = updateList;

    this.refreshStorage(all);
  }

  static refreshCompleted(updateList) {
    const all = this.getStorage();
    all["completed"] = updateList;

    this.refreshStorage(all);
  }

  static refreshStorage(updateList) {
    localStorage.setItem(TaskStorage.key, JSON.stringify(updateList));
  }

  static addToDo(task) {
    const all = this.getToDo();
    task["id"] = crypto.randomUUID();

    all.push(task);
    this.refreshToDo(all);
  }

  static delete(id) {
    const tasks = this.getStorage();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) tasks.splice(foundIndex, 1);
    this.refreshStorage(tasks);
  }

  static patch(id, payload) {
    const tasks = this.getStorage();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) tasks[foundIndex][key] = payload[key];
      this.refreshStorage(tasks);
    }

    return tasks[foundIndex];
  }
}
