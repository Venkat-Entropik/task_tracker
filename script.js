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
const containers = document.querySelectorAll(".container");
const cancelBtn = document.querySelector('.fa-xmark');

//Getting data from local storage if nothing is resent it will return empty array []

const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Declared the task object with empty values

let task = {
  id: '',
  description: '',
  status: 'all',
  creatingTime: '',
  updatingTime: ''
};

//Declared the task edit to null

let taskToEdit = null;

init();

function init() {

  loadDarkMode()
  
  createBtn.addEventListener('click', popUpOpen);
  submitBtn.addEventListener('click', submitTask);
  cancelBtn.addEventListener('click', popUpClose);
  textArea.addEventListener('keyup', textAreaData);
  dropDown.addEventListener('change',dropDownData);

  const dataFromStorage = JSON.parse(localStorage.getItem('tasks'));
  dataFromStorage.forEach((task) => {
    const box = createTaskBox(task);
    displayTaskBox(box, task.status.toLowerCase());
  });

  dragAndDrop()

}

// Getting input from textarea
function textAreaData(e){
 task={...task,description:e.target.value}
}

//updating status
function dropDownData(e){
  task={...task,status:e.target.value}
}


function loadDarkMode(){
  let toggle = localStorage.getItem('darkMode') === 'true'; //if dark mode value is true in local storage then adding class name
  if (toggle) {
    body.classList.add('dark-theme'); 
    toggleBtn.checked = true; //input checkbox set to true
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

//Creating Box and appending to the containers

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
    updatedTime.value = new Date().toString().slice(4, 24);
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

function displayTaskBox(box, status) {
  switch (status) {
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

function createButton(text, className) {
  const button = document.createElement('button');
  button.setAttribute('class', className);
  button.innerHTML = `<i class="fa-solid fa-pen"></i> ${text}`;
  return button;
}

function removeTask(task) {
  const index = existingTasks.findIndex((t) => t.id === task.id);
  if (index !== -1) {
    existingTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    window.location.reload()
  }
}

function updateTaskStatus(draggable) {
  const taskId = draggable.dataset.id;
  const parent = draggable.parentElement;
  const containerId = parent.children[1].id;
  const index = existingTasks.findIndex(task => task.id === taskId);

  if (index !== -1) {
    existingTasks[index].status = containerId;
    existingTasks[index].updatedTime = new Date().toString().slice(4, 24);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
    window.location.reload();
  }
}

function popUpOpen() {
  popup.style.display = 'block';
  textArea.value = '';
  dropDown.value = 'all';
  if (taskToEdit) {
    textArea.value = taskToEdit.description;
    dropDown.value = taskToEdit.status;
  }
}

function popUpClose() {
  popup.style.display = 'none';
}

function submitTask() {
  if (taskToEdit) {
    const index = existingTasks.findIndex((t) => t.id === taskToEdit.id);
    if (index !== -1) {
      const updatedTask = {
        ...taskToEdit,
        description: textArea.value,
        status: dropDown.value,
        updatedTime: new Date().toString().slice(4, 24),
      };
      existingTasks[index] = updatedTask;
      localStorage.setItem('tasks', JSON.stringify(existingTasks));
      taskToEdit = null;
    }
  } else {
    const newTask = {
      ...task,
      creatingTime: new Date().toString().slice(4, 24),
      id: new Date().getTime().toString(),
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
  window.location.reload();
}


function dragAndDrop(){
  const elements = document.querySelectorAll('.draggable');
  elements.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      updateTaskStatus(draggable);
    });
  });

  containers.forEach(container => {
    container.addEventListener("dragover", () => {
      const draggedElement = document.querySelector(".dragging");
      container.append(draggedElement);
    });
  });
}