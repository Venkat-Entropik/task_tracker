import { filterInputFunc } from "./filter";
import { removeHideClass } from "./filter";

jest.useFakeTimers();

describe('filterInputFunc', () => {
  beforeEach(() => {
   
    document.body.innerHTML = `
      <div data-id="1"></div>
      <div data-id="2"></div>
    `;
  });

  test('filtering task based on description', () => {
    const  existingTasks=[{id:1,description:'task 1'},{id:2,description:'task 2'}]
    const eventMock = { target: { value: 'task 1' } };
    filterInputFunc(eventMock,existingTasks);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(false);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(true);
  });

  test('filtering the task 2 based on description', () => {
    const  existingTasks=[{id:1,description:'task 1'},{id:2,description:'task 2'}]
    const eventMock = { target: { value: 'task 2' } };
    filterInputFunc(eventMock,existingTasks);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(true);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(false);
  });

  test('if the input value is empty string it will unhide the tasks', () => {
    const  existingTasks=[{id:1,description:'task 1'},{id:2,description:'task 2'}]
    const eventMock = { target: { value: '' } };
    filterInputFunc(eventMock,existingTasks);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(false);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(false);
  });

  test('if the value matches it will hide the tasks', () => {
    const  existingTasks=[{id:1,description:'task 1'},{id:2,description:'task 2'}]
    const eventMock = { target: { value: 'random' } };
    filterInputFunc(eventMock,existingTasks);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(true);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(true);
  });

  test('testing RemoveHideClass',()=>{

    const  existingTasks=[{id:1,description:'random 1'},{id:2,description:'random 2'}]
    document.querySelector('[data-id="1"]').classList.add('hide')
    document.querySelector('[data-id="2"]').classList.add('hide')
    removeHideClass(existingTasks)
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(false);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(false);
  })

});



