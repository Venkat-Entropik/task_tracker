import { popUpClose } from "./popUpClose.js";

describe('popup close', () => {

  test('popup close testing', () => {
  
    const popup = document.createElement('div');
    popup.id = 'popupContainer';
    document.body.appendChild(popup);

    popUpClose(popup);
   
    expect(popup.style.display).toBe('none');
  });

});
