import { ToDoManager } from "./scripts/services.js";
import { ToDoStorage } from "./scripts/storage.js";

const btnAdd = document.getElementById("add-task");

const btnFilterToDo = document.getElementById("filter-to-do");
const btnFilterCompleted = document.getElementById("filter-completed");

ToDoManager.showToDo();

let i = 1;

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  ToDoManager.createTask({ name: i });

  i++;
});

btnFilterCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  btnFilterCompleted.classList.remove("disabled");
  btnFilterToDo.classList.add("disabled");

  ToDoManager.showCompleted();
});

btnFilterToDo.addEventListener("click", (e) => {
  e.preventDefault();
  btnFilterToDo.classList.remove("disabled");
  btnFilterCompleted.classList.add("disabled");

  ToDoManager.showToDo();
});
