import { ToDoService } from "./scripts/services.js";

const btnAdd = document.getElementById("add-task");

const btnFilterToDo = document.getElementById("filter-to-do");
const btnFilterCompleted = document.getElementById("filter-completed");

ToDoService.showToDo();

let i = 1;

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  ToDoService.createTask({ name: i });

  i++;
});

btnFilterCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  btnFilterCompleted.classList.remove("disabled");
  btnFilterToDo.classList.add("disabled");

  ToDoService.showCompleted();
});

btnFilterToDo.addEventListener("click", (e) => {
  e.preventDefault();
  btnFilterToDo.classList.remove("disabled");
  btnFilterCompleted.classList.add("disabled");

  ToDoService.showToDo();
});
