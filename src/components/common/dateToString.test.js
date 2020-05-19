import dateToString from './dateToString';

test('17.12.1995 should be returnded', () => {
  const input = new Date('December 17, 1995 03:24:00');
  const actual = dateToString(input);
  const expected = '17.12.1995';
  expect(actual).toBe(expected);
});

test('date should instance of class Date, not number', () => {
  const input = 123;
  const actual = () => dateToString(input);
  const expected = new Error('date should instance of class Date');
  expect(actual).toThrowError(expected);
});

test('date should instance of class Date, not string', () => {
  const input = 'abc';
  const actual = () => dateToString(input);
  const expected = new Error('date should instance of class Date');
  expect(actual).toThrowError(expected);
});

test('date should instance of class Date, not array', () => {
  const input = [1, 2, 3];
  const actual = () => dateToString(input);
  const expected = new Error('date should instance of class Date');
  expect(actual).toThrowError(expected);
});

test('date should instance of class Date, not boolean', () => {
  const input = true;
  const actual = () => dateToString(input);
  const expected = new Error('date should instance of class Date');
  expect(actual).toThrowError(expected);
});
