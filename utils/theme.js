

export function loadDarkMode(body,toggleBtn) {
    let toggle = localStorage.getItem('darkMode') === 'true'; 
    if (toggle) {
      body.classList.add('dark-theme');
      toggleBtn.checked = true; 
    }
   if(toggleBtn){
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
  }
