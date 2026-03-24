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

  static create(toDoList) {
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

export class TaskService {
  static toDoId;

  // Obter ToDo
  static getToDoRef() {
    return ToDoStorage.getById(TaskService.toDoId);
  }

  // Obter lista de todas as tarefas concluídas
  static getToDoTasks() {
    return this.getToDoRef()["toDo"];
  }

  // Obter lista de todas as tarefas pendentes
  static getCompletedTasks() {
    return this.getToDoRef()["completed"];
  }

  // Criar uma nova tarefa pendente
  static createTask(task) {
    /*
    1 - Obter a lista de tarefas pendentes
    2 - Inserir o id na task
    3 - Adicionar na lista de tarefas pendentes a nova tarefa
    4 - Salvar lista atualizada no storage
    */
    const list = this.getToDoTasks();
    task["id"] = crypto.randomUUID();

    list.push(task);
    this.refreshToDo(list);
  }

  static editToDoRef(patch) {
    ToDoStorage.patch(TaskService.toDoId, patch);
  }

  static refreshToDo(updateList) {
    const all = this.getToDoTasks();
    all["to-do"] = updateList;

    this.editToDoRef(all);
  }

  static refreshCompleted(updateList) {
    const all = this.getToDoRef();
    all["completed"] = updateList;

    this.editToDoRef(all);
  }

  static delete(id) {
    const tasks = this.getToDoRef();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) tasks.splice(foundIndex, 1);
    this.editToDoRef(tasks);
  }

  static patch(id, payload) {
    const tasks = this.getToDoRef();
    const foundIndex = tasks.findIndex((v) => v.id == id);

    if (foundIndex != -1) {
      for (let key in payload) tasks[foundIndex][key] = payload[key];
      this.editToDoRef(tasks);
    }

    return tasks[foundIndex];
  }
}
