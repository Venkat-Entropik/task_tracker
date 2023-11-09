export function createButton(text, className) {
    const button = document.createElement('button');
    button.setAttribute('class', className);
    const icon = className === "btnEdit" ? '<i class="fa-solid fa-pen"></i>' : '<i class="fa-solid fa-trash"></i>';
    button.innerHTML = `${icon} ${text}`
    return button;
  }