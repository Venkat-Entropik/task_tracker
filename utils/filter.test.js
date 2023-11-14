import { filterInputFunc } from "./filter";


jest.useFakeTimers();

describe('filterInputFunc', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-id="1"></div>
      <div data-id="2"></div>
    `;
  });

  test('it filters tasks based on input - matching value', () => {
    const eventMock = { target: { value: 'task 1' } };
    filterInputFunc(eventMock);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(false);
  });

  test('it filters tasks based on input - non-matching value', () => {
    const eventMock = { target: { value: 'task 2' } };
    filterInputFunc(eventMock);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(false);
  });

  test('it removes "hide" class when input length is less than 3', () => {
    const eventMock = { target: { value: 'ta' } };
    filterInputFunc(eventMock);
    jest.advanceTimersByTime(500);
    expect(document.querySelector('[data-id="1"]').classList.contains('hide')).toBe(false);
    expect(document.querySelector('[data-id="2"]').classList.contains('hide')).toBe(false);
  });
});


