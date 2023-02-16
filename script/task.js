// selection part
const addTask = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterTask = document.getElementById('filter');
const clearAll = document.getElementById('clear-all');


// add events listener
addTask.addEventListener('click', handleAddTask);
taskList.addEventListener('click', handleRemove);
filterTask.addEventListener('keyup', handleFilter);
clearAll.addEventListener('click', handleClearAll);
document.addEventListener('DOMContentLoaded',getTask);


function getInputValue(id) {
    const targetInput = document.getElementById(id);
    return targetInput.value;
}
function setInputValue(id, value) {
    const targetInput = document.getElementById(id);
    targetInput.value = value;
}

// function

function handleAddTask(e) {
    e.preventDefault();

    const taskText = getInputValue('task-input');
    if (taskText === '') {
        alert(`Please enter your task`);
        return;
    }
    // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText + " "));

    const link = document.createElement('a');
    link.setAttribute('href', '#');
    const x = document.createTextNode('x');
    link.appendChild(x);
    li.appendChild(link);

    taskList.appendChild(li);
    saveInLocalStorage(taskText);

    setInputValue('task-input', '');
}


function handleRemove(e) {
    if (e.target.hasAttributes('href')) {
        if (confirm(`Are you sure??`))
            e.target.parentNode.remove()
    }

}

function handleFilter(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {

        if (task.firstChild.textContent.indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

function handleClearAll() {
    // taskList.innerText = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function saveInLocalStorage(task){
    let localTask;
    if(localStorage.getItem('tasks') === null){
        localTask = [];
    }else {
        localTask = JSON.parse(localStorage.getItem('tasks'));
    }
    localTask.push(task)

    localStorage.setItem('tasks',JSON.stringify(localTask));
}

function getTask(){
    let localTask;
    if(localStorage.getItem('tasks') === null){
        localTask = [];
    }else {
        localTask = JSON.parse(localStorage.getItem('tasks'));
    }
    localTask.forEach(eachTask => {
        const li = document.createElement('li');
    li.appendChild(document.createTextNode(eachTask + " "));

    const link = document.createElement('a');
    link.setAttribute('href', '#');
    const x = document.createTextNode('x');
    link.appendChild(x);
    li.appendChild(link);

    taskList.appendChild(li);
    })
}
