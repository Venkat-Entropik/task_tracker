import { loadDarkMode } from "./theme.js";

const body = document.body;
const toggleBtn = document.createElement('input');
toggleBtn.type = 'checkbox';
toggleBtn.classList.add('toggle-input');
document.body.appendChild(toggleBtn);

describe('loadDarkMode', () => {
  beforeEach(() => {
  
    body.classList.remove('dark-theme');
    localStorage.clear();
  });

  test('adding class', () => {
   
    localStorage.setItem('darkMode', 'true');
    loadDarkMode(body,toggleBtn);
    expect(body.classList.contains('dark-theme')).toBe(true);
  });

  test('removing class', () => {
    localStorage.setItem('darkMode', 'false');
    loadDarkMode(body,toggleBtn);
    expect(body.classList.contains('dark-theme')).toBe(false);
  });

  test('event listener toggle class', () => {
    loadDarkMode(body, toggleBtn);
    const changeEvent = new Event('change', { bubbles: true });
    toggleBtn.dispatchEvent(changeEvent);
    expect(body.classList.contains('dark-theme')).toBe(toggleBtn.checked);
    expect(localStorage.getItem('darkMode')).toBe(toggleBtn.checked ? 'true' : 'false');
  
  });

  test('event listener toggle class', () => {
    loadDarkMode(body, toggleBtn);
    const changeEventOff = new Event('change', { bubbles: true });
    toggleBtn.checked = false;
    toggleBtn.dispatchEvent(changeEventOff);
    expect(body.classList.contains('dark-theme')).toBe(false);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
});