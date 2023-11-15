import  {createButton}  from "./createButton.js";


describe('createButton function', () => {
  test('create button', () => {
    const buttonText = 'Edit';
    const buttonClass = 'btnEdit';
    const button = createButton(buttonText, buttonClass);
    expect(button.textContent.trim()).toBe('Edit');
    expect(button.classList.contains('btnEdit')).toBe(true);
  });

  test('Delete button', () => {
    const buttonText = 'Remove';
    const buttonClass = 'removeBtn';
    const button = createButton(buttonText, buttonClass);
    expect(button.textContent.trim()).toBe('Remove');
    expect(button.classList.contains('removeBtn')).toBe(true);
  });
});

