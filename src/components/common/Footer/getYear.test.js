import getYear from './getYear';

test('current year should be returnded', () => {
  const actual = getYear();
  const expected = new Date().getFullYear();
  expect(actual).toBe(expected);
});
