
const all = document.getElementById('All');
const working = document.getElementById('Working');
const pending = document.getElementById('Pending');
const completed = document.getElementById('Completed');

export function displayTaskBox(box, status) {
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