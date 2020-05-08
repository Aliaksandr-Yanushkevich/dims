import getYear from './getYear';

test('2020 should be returnded', () => {
  expect(getYear()).toBe(new Date().getFullYear());
});
