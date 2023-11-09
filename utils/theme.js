const toggleBtn = document.querySelector('.toggle-input');
const body = document.body;

export function loadDarkMode() {
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