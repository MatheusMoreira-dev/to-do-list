import { Task } from "./scripts/models.js";
import { TaskStorage } from "./scripts/storage.js";
import { SelectTags, TaskRow } from "./scripts/layout.js";

const tableTasks = document.querySelector("#tasks tbody");
const btnAdd = document.getElementById("add-task");

function renderSaveTasks() {
  const tasks = TaskStorage.getAll().map((v) => new Task(v));

  for (let task of tasks) {
    tableTasks.prepend(new TaskRow(task).row);
  }
}

renderSaveTasks();

let i = 1;

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  const emptyTask = new Task({ name: i });
  const row = new TaskRow(emptyTask);

  TaskStorage.add(emptyTask);

  tableTasks.prepend(row.row);
  i++;
});
