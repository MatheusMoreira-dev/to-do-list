import { ToDoStorage, TaskStorage } from "./storage.js";
import { ToDoList, Task } from "./models.js";

export class SelectTags {
  static defaultOptions = [
    { name: "", value: "" },
    { name: "Trabalho", value: "trabalho" },
    { name: "Faculdade", value: "faculdade" },
    { name: "Mercado", value: "mercado" },
    { name: "Revisão", value: "revisão" },
  ];

  constructor() {
    this.element = document.createElement("select");

    for (let option of SelectTags.defaultOptions) {
      this.addLabel(option);
    }
  }

  addLabel({ name, value }) {
    const option = document.createElement("option");
    option.label = name;
    option.value = value;

    this.element.append(option);
  }
}

export class ToDoView {
  constructor(id) {
    this.id = id;

    const found = ToDoStorage.findById(id);
    if (found) this.toDo = new ToDoList(found);
  }

  showTitle() {}

  showButtons() {}

  showTable() {}

  static showCompleted() {}

  static showToDo() {}
}

export class TaskRow {
  constructor(task) {
    this.task = task;
    this.row = document.createElement("tr");

    this.row.append(
      this.colCheckbox(task.isCompleted),
      this.colName(task.name),
      this.colTag(task.tag),
      this.colTrash(),
    );
  }

  colCheckbox(isCompleted) {
    const col = document.createElement("td");
    col.classList.add("col-status");

    const checkbox = document.createElement("input");
    checkbox.classList.add("cell-content", "checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.value = isCompleted;

    checkbox.onclick = (e) => {
      const boolValue = e.target.checked;
      const patchTask = TaskStorage.patch(this.task.id, {
        isCompleted: boolValue,
      });

      e.target.value = boolValue;
      this.task = patchTask;
    };

    col.append(checkbox);

    return col;
  }

  colName(name) {
    const col = document.createElement("td");

    col.contentEditable = true;
    col.textContent = name;

    col.addEventListener("blur", (e) => {
      TaskStorage.patch(this.task.id, { name: e.target.textContent });
    });

    return col;
  }

  colTag(tag) {
    const col = document.createElement("td");

    const content = document.createElement("div");
    content.classList.add("cell-content");

    const select = new SelectTags();
    select.element.value = tag;
    this.task.tag = tag;

    col.append(select.element);
    return col;
  }

  colTrash() {
    const col = document.createElement("td");

    const img = document.createElement("img");
    img.classList.add("trash");
    img.src = "./assets/trash.svg";
    img.onclick = () => this.deleteRow();

    col.appendChild(img);
    return col;
  }

  deleteRow() {
    this.row.remove();
    TaskStorage.delete(this.task.id);
  }
}
