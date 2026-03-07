const tableTasks = document.querySelector("#tasks tbody");
const btnAdd = document.getElementById("add-row");

class TaskRow{
    constructor(name = "", completed = false, etiqueta = ""){
        this.element = document.createElement("tr");
        
        this.colName = document.createElement("td");
        this.colName.textContent = name;
        
        this.completed = document.createElement("td");
        
        this.etiqueta = document.createElement("td");
    }
}

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    const row = document.createElement("tr");
    row.innerHTML = "teste";

    tableTasks.prepend(row);
});