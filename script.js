const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        text:text,
        date:taskDate.value,
        completed:false
    });

    saveTasks();

    taskInput.value="";
    taskDate.value="";

    displayTasks();
}

function displayTasks(){

    taskList.innerHTML="";

    let filteredTasks = tasks;

    if(currentFilter === "completed"){
        filteredTasks =
        tasks.filter(task => task.completed);
    }

    if(currentFilter === "pending"){
        filteredTasks =
        tasks.filter(task => !task.completed);
    }

    if(filteredTasks.length === 0){
        emptyState.style.display="block";
    }
    else{
        emptyState.style.display="none";
    }

    filteredTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.classList.add("task");

        li.innerHTML=`

        <div class="task-info ${task.completed ? 'completed' : ''}">

            <h3>${task.text}</h3>

            <p>
            ${
                task.date
                ? new Date(task.date).toLocaleString()
                : "No Date & Time"
            }
            </p>

        </div>

        <div class="actions">

            <button
            class="complete"
            onclick="toggleComplete(${tasks.indexOf(task)})">
            ✓
            </button>

            <button
            class="edit"
            onclick="editTask(${tasks.indexOf(task)})">
            Edit
            </button>

            <button
            class="delete"
            onclick="deleteTask(${tasks.indexOf(task)})">
            Delete
            </button>

        </div>
        `;

        taskList.appendChild(li);

    });
}

function toggleComplete(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index){

    const newTask =
    prompt("Edit Task", tasks[index].text);

    if(newTask !== null &&
       newTask.trim() !== ""){

        tasks[index].text = newTask;

        saveTasks();
        displayTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();
        displayTasks();
    }
}

function filterTasks(type){

    currentFilter = type;

    displayTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
