import { dateAndTime } from "./dateAndTime.js";
describe('dateAndTime', () => {
    test('should return date and time', () => {
      const result = dateAndTime();
      
      function newDateAndTIme(){
        let date = new Date().toLocaleDateString()
        let time = new Date().toLocaleTimeString()
        return `${date} ${time}`
      }
      
      expect(result).toEqual(newDateAndTIme());
    });
  });