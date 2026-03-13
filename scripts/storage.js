export class ToDoStorage {
  static key = "to-do-list";

  static getAll() {
    const items = localStorage.getItem(ToDoStorage.key);
    return items ? JSON.parse(items) : [];
  }

  static getById(id) {
    return this.getAll().find((t) => t.id == id);
  }

  static refreshStorage(updateList) {
    localStorage.setItem(ToDoStorage.key, JSON.stringify(updateList));
  }

  static add(toDoList) {
    const all = this.getAll();
    toDoList["id"] = crypto.randomUUID();

    all.push(toDoList);
    this.refreshStorage(all);
  }

  static patch(id, payload) {
    const items = this.getAll();
    const foundIndex = items.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) items[foundIndex][key] = payload[key];
      this.refreshStorage(items);
    }

    return items[foundIndex];
  }

  static delete(id) {
    const items = this.getToDoList();
    const foundIndex = items.findIndex((v) => v.id == id);

    if (foundIndex != -1) items.splice(foundIndex, 1);
    this.refreshStorage(items);
  }
}

export class TaskStorage {
  static toDoId = "tasks";

  static structure = {
    "to-do": [],
    completed: [],
  };

  static getToDoList() {
    return ToDoStorage.getById(TaskStorage.toDoId);
  }

  static listToDoTasks() {
    return this.getToDoList()["toDo"];
  }

  static listCompletedTasks() {
    return this.getToDoList()["completed"];
  }

  static createTask(task) {
    /*
    1 - Buscar o item ToDo no ToDoStorage
    2 - Obter a lista de tarefas pendentes
    3 - Adicionar na lista de tarefas pendentes a nova tarefa
    4 - Atualizar o attr "toDo" no objeto com a lista atualizada
    5 - Ataulizar o registro do objeto no Storage
    */
    const list = this.listToDoTasks();
    task["id"] = crypto.randomUUID();

    list.push(task);
    this.refreshToDo(list);
  }

  static refreshStorage(updateList) {
    localStorage.setItem(TaskStorage.toDoId, JSON.stringify(updateList));
  }

  static refreshToDo(updateList) {
    const all = this.listToDoTasks();
    all["to-do"] = updateList;

    this.refreshStorage(all);
  }

  static refreshCompleted(updateList) {
    const all = this.getToDoList();
    all["completed"] = updateList;

    this.refreshStorage(all);
  }

  static delete(id) {
    const tasks = this.getToDoList();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) tasks.splice(foundIndex, 1);
    this.refreshStorage(tasks);
  }

  static patch(id, payload) {
    const tasks = this.getToDoList();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) tasks[foundIndex][key] = payload[key];
      this.refreshStorage(tasks);
    }

    return tasks[foundIndex];
  }
}
