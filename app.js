const tableTasks = document.querySelector("#tasks tbody");
const btnAdd = document.getElementById("add-row");

class SelectLabel{
    static defaultOptions = [
        {name: "", value: ""},
        {name: "Trabalho", value: "trabalho"}, 
        {name: "Faculdade", value: "faculdade"}, 
        {name: "Mercado", value:"mercado"}, 
        {name: "Revisão", value: "revisão"}
    ];

    constructor(){
        this.element = document.createElement("select");
        SelectLabel.defaultOptions.forEach(opt => this.addLabel(opt));
    }

    addLabel({name, value}){
        const option = document.createElement("option");
        option.label = name;
        option.value = value;

        this.element.append(option);
    }
}

class TaskRow{
    constructor({name = "", isCompleted = false, etiqueta = ""}){
        this.element = document.createElement("tr");
        
        this.colName = document.createElement("td");
        this.colName.textContent = name;
        
        this.colCheckbox = document.createElement("td");
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.value = isCompleted;
        this.colCheckbox.append(this.checkbox);
        
        this.colEtiqueta = document.createElement("td");
        this.colEtiqueta.append(new SelectLabel().element);
        
        this.element.append(this.colCheckbox, this.colName, this.colEtiqueta);
    }
}

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();

    tableTasks.prepend(new TaskRow({name: "teste"}).element);
});