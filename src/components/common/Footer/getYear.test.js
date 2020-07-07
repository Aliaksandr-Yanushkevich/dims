import getYear from './getYear';

test('current year should be returned', () => {
  const actual = getYear();
  const expected = new Date().getFullYear();
  expect(actual).toBe(expected);
});
