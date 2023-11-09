// import { existingTasks } from "../script";
 const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 let filterValue=''
 let debounceTimeout=null



function removeHideClass(){
    existingTasks.forEach((task)=>{
       const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`); //getting element from the dom elements
        existingTaskElement.classList.remove('hide')
    })
  }
  
  // Filter input
 export function filterInputFunc(e) {
   
    filterValue = e.target.value.toLowerCase(); // Getting value from input
  
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