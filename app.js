const tableTasks = document.querySelector("#tasks tbody");
const btnAdd = document.getElementById("add-row");

class SelectTags{
    static defaultOptions = [
        {name: "", value: ""},
        {name: "Trabalho", value: "trabalho"}, 
        {name: "Faculdade", value: "faculdade"}, 
        {name: "Mercado", value:"mercado"}, 
        {name: "Revisão", value: "revisão"}
    ];

    constructor(){
        this.element = document.createElement("select");

        for (let option of SelectTags.defaultOptions){
            this.addLabel(option);
        }
    }

    addLabel({name, value}){
        const option = document.createElement("option");
        option.label = name;
        option.value = value;

        this.element.append(option);
    }
}

class Task{
    constructor({name = "", isCompleted = false, tag = ""}){
        this.id = crypto.randomUUID();
        this.name = name;
        this.isCompleted = isCompleted;
        this.tag = tag;
    }
}

class TaskStorage{
    static key = "tasks";

    static update(updateList){
        localStorage.setItem(TaskStorage.key, JSON.stringify(updateList));
    }

    static getAll(){
        const items = localStorage.getItem(TaskStorage.key);

        return items ? JSON.parse(items) : [];
    }

    static add (task) {
        const allTasks = this.getAll();
        allTasks.push(task);

        this.update(allTasks);
    }
}

class TaskRow{
    constructor(task){
        this.element = document.createElement("tr");
        
        this.element.append(
            this.colCheck(task.isCompleted), 
            this.colName(task.name), 
            this.colTag(task.tag),
            this.colTrash()
        );
    }

    colCheck(isCompleted){
        const col = document.createElement("td");
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = isCompleted;
        
        col.append(checkbox);

        return col;
    }

    colName(name){
        const col = document.createElement("td");
        col.textContent = name;

        return col;
    }

    colTag(){
        const col = document.createElement("td");
        col.append(new SelectTags().element);

        return col;
    }

    colTrash(){
        const btn = document.createElement("button");
        btn.innerText = "Excluir";
        btn.onclick = () => this.element.remove();

        return btn;
    }
}

let i = 1;

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    const emptyTask = new Task({name: i});
    const row = new TaskRow(emptyTask);
    
    TaskStorage.add(emptyTask);

    tableTasks.prepend(row.element);
    i++;
}); 