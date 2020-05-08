import dateToString from './dateToString';

test('17.12.1995 should be returnded', () => {
  expect(dateToString(new Date('December 17, 1995 03:24:00'))).toBe('17.12.1995');
});

test('date should instance of class Date', () => {
  expect(() => dateToString(123)).toThrowError(new Error('date should instance of class Date'));
});

test('date should instance of class Date', () => {
  expect(() => dateToString('abc')).toThrowError(new Error('date should instance of class Date'));
});

test('date should instance of class Date', () => {
  expect(() => dateToString([1, 2, 3])).toThrowError(new Error('date should instance of class Date'));
});

test('date should instance of class Date', () => {
  expect(() => dateToString(true)).toThrowError(new Error('date should instance of class Date'));
});
