import { TaskRow } from "./layout.js";
import { Task } from "./models.js";
import { TaskStorage } from "./storage.js";

export class ToDoManager {
  static bodyElement = document.querySelector("#tasks tbody");

  // Edita o título
  static setTitle() {}

  // Cria uma nova Task
  static createTask(data) {
    /*
     1 - Cria um objeto Task
     2 - Salva a Task no Storage
     3 - Mostra na tabela a nova Task
    */
    const task = new Task(data);
    TaskStorage.createTask(task);
    this.bodyElement.prepend(new TaskRow(task).row);
  }

  // Mostra todas as tasks pendentes
  static showToDo() {
    /*
     1 - Busca no Storage as pendentes
     2 - Converte em objetos da classe Task e posterior mente em linhas
     3 - Remove os nodes e adiciona os novos
    */
    const data = TaskStorage.listToDoTasks();
    const tasksRow = data
      .map((d) => new Task(d))
      .map((t) => new TaskRow(t).row);

    this.replaceRows(tasksRow);
  }

  // Mostra todas as tasks pendentes
  static showCompleted() {
    /*
     1 - Busca no Storage os concluídos
     2 - Converte em objetos da classe Task e posteriormente em do tipo TaskRow
     3 - Remove os nodes e adiciona os novos
    */
    const data = TaskStorage.listCompletedTasks();
    const tasksRow = data
      .map((d) => new Task(d))
      .map((t) => new TaskRow(t).row);

    this.replaceRows(tasksRow);
  }

  // Remove todas as linhas adiciona novas
  static replaceRows(tasksRow) {
    this.bodyElement.replaceChildren(...tasksRow);
  }
}
