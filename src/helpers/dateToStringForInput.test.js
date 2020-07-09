import dateToStringForInput from './dateToStringForInput';

describe('func returns string with date, month and year from Date object adapted to date field', () => {
  test('1995-12-17 should be returnded', () => {
    const input = new Date('December 17, 1995 03:24:00');
    const actual = dateToStringForInput(input);
    const expected = '1995-12-17';
    expect(actual).toBe(expected);
  });

  test('date should instance of class Date, not number', () => {
    const input = 123;
    const actual = () => dateToStringForInput(input);
    const expected = new Error('date should instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('date should instance of class Date, not string', () => {
    const input = 'abc';
    const actual = () => dateToStringForInput(input);
    const expected = new Error('date should instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('date should instance of class Date, not array', () => {
    const input = [1, 2, 3];
    const actual = () => dateToStringForInput(input);
    const expected = new Error('date should instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('date should instance of class Date, not boolean', () => {
    const input = true;
    const actual = () => dateToStringForInput(input);
    const expected = new Error('date should instance of class Date');
    expect(actual).toThrowError(expected);
  });
});
