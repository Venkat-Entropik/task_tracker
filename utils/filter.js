
 const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
 let filterValue=''
 let debounceTimeout=null


  
 export function filterInputFunc(e) {
   
    filterValue = e.target.value.toLowerCase(); 
  
    if (filterValue.length >= 3) { 
      clearTimeout(debounceTimeout); 
  
      debounceTimeout = setTimeout(function () { 
        existingTasks.forEach((task)=>{ 
          if(task.description.toLowerCase().includes(filterValue)){ 
            const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`); 
            existingTaskElement.classList.remove('hide') 
          }else{
            const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`);
            existingTaskElement.classList.add('hide')   
          }
        });
      }, 500);
    }else{
      removeHideClass()
    }
  }

 function removeHideClass(){
  existingTasks.forEach((task) => {
      const existingTaskElement = document.querySelector(`[data-id="${task.id}"]`);
      if (existingTaskElement) {
          existingTaskElement.classList.remove('hide');
      }
  });
}