// let tasks = JSON.parse(localStorage.getItem("tasks"))  || []; // Array of objects it will store all the elements 
let tasks = [];

const saved = localStorage.getItem('tasks'); //Getting syting of data back from local storage;

if(saved)
{
    try{
        tasks = JSON.parse(saved);
        if(!Array.isArray(tasks)) tasks = [];
    }
    catch(err)
    {
        console.log("Could Not parsed Saved Object: ", err);
        tasks = [];
        localStorage.removeItem("tasks");
    }
}


//Selecting DOM Elements

const taskNameInput   = document.querySelector("#task_name");  
const taskCategory    = document.querySelector("#task_category");  
const taskPriority    = document.querySelector("#task_priority");  
const taskDate        = document.querySelector("#task_date");  
const addTaskBtn      = document.querySelector("#add_task_btn");  
const taskListContainer = document.querySelector(".task_list");  
const taskContainer = document.querySelector(".task_container")

   renderTasks();

//rendering Tasks
function renderTasks() {
    // First clear old tasks from the container
    taskContainer.innerHTML = "";

    // Loop through tasks array
    tasks.forEach((task) => {
        // 1. Create the wrapper div
        let item = document.createElement('div');
        item.classList.add('task_item');

        // 2. Create elements just like you did in addTask
        let checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.classList.add('task_check');
        checkBox.checked = task.status; // ✅ keep status

        let taskName = document.createElement('span');
        taskName.textContent = task.name;
        taskName.classList.add('task_name');
        if(task.status) taskName.classList.add('completed'); // ✅ line-through if done

        let categoryType = document.createElement('span');
        categoryType.textContent = task.category;
        categoryType.classList.add('task_category');

        let priorityType = document.createElement('span');
        priorityType.textContent = task.priority;
        if(task.priority === "High") priorityType.classList.add('task_priority', 'high');
        else if(task.priority === "Medium") priorityType.classList.add('task_priority', 'medium');
        else priorityType.classList.add('task_priority', 'low');

        let date = document.createElement('span');
        date.textContent = task.date;
        date.classList.add('task_date');

        let dltButton = document.createElement('button');
        dltButton.textContent = "❌";
        dltButton.classList.add('delete_btn');

        // 3. Append all children
        item.appendChild(checkBox);
        item.appendChild(taskName);
        item.appendChild(categoryType);
        item.appendChild(priorityType);
        item.appendChild(date);
        item.appendChild(dltButton);

        // 4. Add functionality (checkbox + delete)
        checkBox.addEventListener('click', () => {
            taskName.classList.toggle('completed');
            task.status = checkBox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        dltButton.addEventListener('click', () => {
            taskContainer.removeChild(item);
            tasks = tasks.filter((t) => t !== task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });

        // 5. Add the item to container
        taskContainer.appendChild(item);
    });
}






taskNameInput.addEventListener('keydown', addTask); //When click
addTaskBtn.addEventListener('click', addTask);

function addTask(event){
    if(event.key === 'Enter' || event.type === 'click')
    {
    let newName = taskNameInput.value;
    let newCategory = taskCategory.value;
    let newPriority = taskPriority.value;
    let newDate = taskDate.value;

    //Adding Validation if anything is Empty 
    if(!newName || !newCategory || !newPriority || !newDate )
    {
        alert("Please fill all the fields before adding a task.")
        return;
    }

    let newTask = {
        name: newName,
        category: newCategory,
        priority: newPriority,
        date: newDate,
        status: false
    };
    tasks.push(newTask); //Pushed the Object into the Array 
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //Resetting values
    taskNameInput.value ="";
    taskCategory.value = "";
    taskPriority.value = "";
    taskDate.value ="";


   renderTasks();
}
}

//Clearing all tasks Functionality 
const clearAll = document.querySelector('#del_all_tasks');
clearAll.addEventListener('click', clearAllTasks);

function clearAllTasks()
{
    localStorage.removeItem('tasks');
    taskContainer.innerHTML = "";
}

//Adding Light and Dark Mode Functionality 

const toggleTheme = document.querySelector('#theme_toggle');
const body = document.body;

//Retaining State saved theme
if(localStorage.getItem("theme") === "dark")
{
    body.classList.toggle('dark_theme');
    toggleTheme.textContent = '☀️'
}



toggleTheme.addEventListener('click', changeTheme)

function changeTheme()
{
    body.classList.toggle('dark_theme');

    if(body.classList.contains('dark_theme')){
        toggleTheme.textContent = '☀️';
        localStorage.setItem("theme", "dark");
    }
    else{
        toggleTheme.textContent = '🌙'
        localStorage.setItem("theme", 'light');
    }

}

