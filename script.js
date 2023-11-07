const popup = document.getElementById('popupContainer');
const createBtn = document.getElementById('createBtn');
const submitBtn = document.getElementById('submitBtn');
const textArea = document.getElementById('textArea');
const dropDown = document.getElementById('dropDown');
const all = document.getElementById('All');
const working = document.getElementById('Working');
const pending = document.getElementById('Pending');
const completed = document.getElementById('Completed');
const toggleBtn = document.querySelector('.toggle-input');
const body = document.body;
const containers = document.querySelectorAll('.container');
const cancelBtn = document.querySelector('.fa-xmark');
const filterInput = document.getElementById('filterTask');
// Getting data from local storage if nothing is present it will return an empty array []

const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Declared the task object with empty values
let task = {
  id: '',
  description: '',
  status: 'all',
  creatingTime: '',
  updatingTime: '',
};

// Declared the task edit to null
let taskToEdit = null;

// Declaring filter value
let filterValue = '';

// Declaring debounce timer
let debounceTimeout;

init();

function init() {

  loadDarkMode(); //theme function 

  createBtn.addEventListener('click', popUpOpen);
  submitBtn.addEventListener('click', submitTask);
  cancelBtn.addEventListener('click', popUpClose);
  textArea.addEventListener('keyup', textAreaData);
  dropDown.addEventListener('change', dropDownData);
  filterInput.addEventListener('keyup', filterInputFunc);

  const dataFromStorage = JSON.parse(localStorage.getItem('tasks')); // getting tasks from local storage
  dataFromStorage.forEach((task) => {
    const box = createTaskBox(task); // creating box to each task
    displayTaskBox(box, task.status.toLowerCase()); // appending tasks based on their status
  });

  dragAndDrop()
  
}

//Date and Time

function dateAndTime(){
  let date = new Date().toLocaleDateString()
  let time = new Date().toLocaleTimeString()
  return `${date} ${time}`
}



// Getting input from textarea
function textAreaData(e) {
  task = { ...task, description: e.target.value };
}

// Updating status
function dropDownData(e) {
  task = { ...task, status: e.target.value };
}


// Clearing containers

function clearContainers() {
  all.innerHTML = '';
  working.innerHTML = '';
  pending.innerHTML = '';
  completed.innerHTML = '';
}



// Update UI
function updateUI() {
  clearContainers();

  existingTasks.forEach((task) => { //looping all the tasks from local storage
   
    const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`); //getting the element using attribute selector

    if (existingTaskElement) { //if the elements is already present in DOM
    
      displayTaskBox(existingTaskElement, task.status.toLowerCase()); // appending that to their containers
    } else { //If not exist creating new box and appending to container
      const box = createTaskBox(task);
      displayTaskBox(box, task.status.toLowerCase());
    }
  
  });
  
  dragAndDrop();
}

//if the characters are less than 3 then it will unhide the tasks
function removeHideClass(){
  existingTasks.forEach((task)=>{
     const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`); //getting element from the dom elements
      existingTaskElement.classList.remove('hide')
  })
}

// Filter input
function filterInputFunc() {
  filterValue = filterInput.value.toLowerCase(); // Getting value from input

  if (filterValue.length >= 3) { //checking input value greater than or equal to 3
    clearTimeout(debounceTimeout); // Clearing timer

    debounceTimeout = setTimeout(function () { 
      existingTasks.forEach((task)=>{ // looping over all tasks
        if(task.description.toLowerCase().includes(filterValue)){ // checking input value matches the task description
          const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`); //getting element from the dom elements
          existingTaskElement.classList.remove('hide') //if the value matches it will show
        }else{
          const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`);
          existingTaskElement.classList.add('hide')   // if the value doesn' matches it will hide
        }
      });
    }, 500);
  }else{
    removeHideClass()
  }
}

//theame changer function

function loadDarkMode() {
  let toggle = localStorage.getItem('darkMode') === 'true'; // If dark mode value is true in local storage then adding class name
  if (toggle) {
    body.classList.add('dark-theme');
    toggleBtn.checked = true; // Input checkbox set to true
  }

  toggleBtn.addEventListener('change', () => {
    if (toggleBtn.checked) {
      localStorage.setItem('darkMode', 'true');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('darkMode', 'false');
    }
  });
}

// Creating Box and appending to the containers
function createTaskBox(task) {
  const box = document.createElement('div');
  box.classList.add('draggable');
  box.classList.add('box');
  box.setAttribute('draggable', true);
  box.dataset.id = task.id;
  const title = document.createElement('h6');
  title.setAttribute('class', 'boxTitle');

  const description = document.createElement('p');
  description.setAttribute('class', 'boxDescription');

  const status = document.createElement('p');
  status.setAttribute('class', 'status');

  const currentTime = document.createElement('p');
  const updatedTime = document.createElement('p');

  const boxButtons = document.createElement('div');
  boxButtons.setAttribute('class', 'buttonsBox');

  const editBtn = createButton('Edit', 'btnEdit');
  editBtn.addEventListener('click', () => {
    taskToEdit = task;
    textArea.value = taskToEdit.description;
    dropDown.value = taskToEdit.status;
    updatedTime.value = dateAndTime();
    popup.style.display = 'block';
  });

  const removeBtn = createButton('Remove', 'removeBtn');
  removeBtn.addEventListener('click', () => {
    removeTask(task);
  });

  boxButtons.appendChild(editBtn);
  boxButtons.appendChild(removeBtn);

  title.innerText = 'Task';
  description.innerText = 'Description: ' + task.description;
  status.innerText = 'Status: ' + task.status;
  currentTime.innerText = 'Created: ' + task.creatingTime;
  updatedTime.innerText = 'Updated: ' + task.updatedTime;

  box.appendChild(title);
  box.appendChild(description);
  box.appendChild(status);
  box.appendChild(currentTime);
  box.appendChild(updatedTime);
  box.appendChild(boxButtons);
  return box;
}

// Appending the tasks based on their status
function displayTaskBox(box, status) {
  switch (status) {
    case '':
      all.appendChild(box);
      break;
    case 'all':
      all.appendChild(box);
      break;
    case 'working':
      working.appendChild(box);
      break;
    case 'pending':
      pending.appendChild(box);
      break;
    case 'completed':
      completed.appendChild(box);
      break;
    default:
      break;
  }
}

// Create button function

function createButton(text, className) {
  const button = document.createElement('button');
  button.setAttribute('class', className);
  const icon = className === "btnEdit" ? '<i class="fa-solid fa-pen"></i>' : '<i class="fa-solid fa-trash"></i>';
  button.innerHTML = `${icon} ${text}`
  return button;
}

// Remove task function
function removeTask(task) {
  const index = existingTasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    existingTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    updateUI();
  }
}

// Updating the status and updating time when drag and drop
function updateTaskStatus(draggable) {
  const taskId = draggable.dataset.id;
  const parent = draggable.parentElement;
  const containerId = parent.children[1].id;

  const index = existingTasks.findIndex((task) => task.id === taskId);

  if (index !== -1) {
    existingTasks[index].status = containerId;
    existingTasks[index].updatedTime = dateAndTime();
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    updateUI();
   
  }
  updateUI();
  
}


// Pop up container 
function popUpOpen() {
  popup.style.display = 'block';
  textArea.value = '';
  dropDown.value = 'all';

  if (taskToEdit) {
    textArea.value = taskToEdit.description;
    dropDown.value = taskToEdit.status;
  }
}

// popup close 

function popUpClose() {
  popup.style.display = 'none';
}

// Submit task function
function submitTask() {
  if (taskToEdit) { 
    const index = existingTasks.findIndex((t) => t.id === taskToEdit.id);
    if (index !== -1) {
      const updatedTask = {
        ...taskToEdit,
        description: textArea.value,
        status: dropDown.value,
        updatedTime: dateAndTime(),
      };
      existingTasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(existingTasks));
      taskToEdit = null;
    }
  } else {
    const newTask = {
      ...task,
      creatingTime: dateAndTime(),
      id: new Date().getTime().toString(),
      updatedTime: 'Not Updated',
    };
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
  }

  textArea.value = '';
  dropDown.value = 'all';
  task = {
    id: '',
    description: '',
    status: '',
    creatingTime: '',
    updatingTime: '',
  };
  
  popup.style.display = 'none';
  updateUI();
}

// Drag and drop
function dragAndDrop() {
  const elements = document.querySelectorAll('.draggable'); // getting all tasks using dragable class
  elements.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      updateTaskStatus(draggable);
    });
  });

  containers.forEach((container) => {
    
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggedElement = document.querySelector('.dragging');
      container.appendChild(draggedElement);
      
    });
  });
}
