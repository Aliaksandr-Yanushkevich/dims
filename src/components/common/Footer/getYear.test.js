import getYear from './getYear';

test('current year should be returnded', () => {
  const input = null;
  const actual = getYear(input);
  const expected = new Date().getFullYear();
  expect(actual).toBe(expected);
});
