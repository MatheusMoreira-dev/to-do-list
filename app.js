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
    constructor({id, name = "", isCompleted = false, tag = ""}){
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
        this.tag = tag;
    }
}

class TaskStorage{
    static key = "tasks";

    static refreshStorage(updateList){
        localStorage.setItem(TaskStorage.key, JSON.stringify(updateList));
    }

    static getAll(){
        const items = localStorage.getItem(TaskStorage.key);

        return items ? JSON.parse(items) : [];
    }

    static add (task) {
        const allTasks = this.getAll();
        task["id"] = crypto.randomUUID();

        allTasks.push(task);

        this.refreshStorage(allTasks);
    }

    static delete(id){
        const tasks = this.getAll();
        const foundIndex = tasks.findIndex(v => v.id==id);

        if(foundIndex != -1) tasks.splice(foundIndex, 1);
        this.refreshStorage(tasks);
    }

    static patch(id, payload){
        const tasks = this.getAll();
        const foundIndex = tasks.findIndex(v => v.id == id);

        if(foundIndex != -1){
            console.log("passou");
            for(let key in payload) tasks[foundIndex][key] = payload[key];
            this.refreshStorage(tasks);
        }

        console.log("fim");
    }
}

class TaskRow{
    constructor(task){
        this.task = task;
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
        checkbox.checked = isCompleted;
        checkbox.value = isCompleted;
        
        checkbox.onclick = (e) => {
            TaskStorage.patch(this.task.id, {"isCompleted": false});
            console.log(this.task);
        };
        
        col.append(checkbox);

        return col;
    }

    colName(name){
        const col = document.createElement("td");
        col.contentEditable = true;
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
        btn.onclick = () => this.deleteRow();

        return btn;
    }

    deleteRow(){
        this.element.remove();
        TaskStorage.delete(this.task.id);
    }
}

function renderSaveTasks(){
    const tasks = TaskStorage.getAll().map(v => new Task(v));
    
    for (let task of tasks){
        tableTasks.prepend(new TaskRow(task).element);        
    }
}

renderSaveTasks();

let i = 1;

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    const emptyTask = new Task({name: i});
    const row = new TaskRow(emptyTask);
    
    TaskStorage.add(emptyTask);

    tableTasks.prepend(row.element);
    i++;
}); 