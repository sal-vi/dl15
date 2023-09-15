// Constantes y declaración de lista/array de tareas

const taskList = document.querySelector("#list-id");
const getInput = document.querySelector("#input-id");
const btnAddTask = document.querySelector("#add-btn-id");
const checkboxCounter = document.querySelector("#span-finished");
const totalCounter = document.querySelector("#span-total");

const tasksArray = [
    { id: 1, name: "Limpiar la cocina", status: false },
    { id: 2, name: "Lavar los platos", status: false },
    { id: 3, name: "Pasear al gato", status: false },
];

// Función para mostrar la lista/array de tareas

function updateTaskList() {
    let html = "";
    let checkedCount = 0; // Contador de checkboxes marcados

    for (let i of tasksArray) {
        const isChecked = i.status ? "checked" : ""; // Checkbox debe estar marcado o no
        html += `<li>${i.id} -- ${i.name}<input type="checkbox" id="checkbox-${i.id}" ${isChecked}><button onclick="erase(${i.id})"><i class="fa-solid fa-xmark"></i> Borrar</button></li>`;
        if (i.status) {
            checkedCount++;
        }
    }

    taskList.innerHTML = html;
    checkboxCounter.textContent = `${checkedCount}`;
    totalCounter.textContent = tasksArray.length.toString(); //Total de tareas listadas

}

updateTaskList(); // Mantener actualizada la lista/array

// Agregar tarea

btnAddTask.addEventListener("click", () => {
    const newTask = { id: getUniqueID(), name: getInput.value, status: false };
    tasksArray.push(newTask);
    getInput.value = "";
    updateTaskList();
});

// Eliminar tareas con botón

function erase(id) {
    const index = tasksArray.findIndex((i) => i.id === id);
    tasksArray.splice(index, 1);
    updateTaskList();
}

// Agregar un evento para escuchar los cambios en los checkboxes
taskList.addEventListener("change", (event) => {
    const checkboxId = event.target.id;
    const taskId = parseInt(checkboxId.split("-")[1]);
    const isChecked = event.target.checked;

    const taskIndex = tasksArray.findIndex((i) => i.id === taskId);
    tasksArray[taskIndex].status = isChecked;

    updateTaskList();
});

// Generar IDs únicos

function getUniqueID() {
    const usedIds = tasksArray.map((task) => task.id);
    let newId = 1;
    while (usedIds.includes(newId)) {
        newId++;
    }
    return newId;
}





