const all = document.getElementById('All');
const working = document.getElementById('Working');
const pending = document.getElementById('Pending');
const completed = document.getElementById('Completed');

export function clearContainers() {
    all.innerHTML = '';
    working.innerHTML = '';
    pending.innerHTML = '';
    completed.innerHTML = '';
  }