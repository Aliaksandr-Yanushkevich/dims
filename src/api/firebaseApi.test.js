import { getLink } from './firebaseApi';

describe('func returns link to database field', () => {
  test('GweCJi3uzCjw2j4gqm7g should be returned', () => {
    const input = 'dims/GweCJi3uzCjw2j4gqm7g';
    const actual = getLink(input);
    const expected = 'GweCJi3uzCjw2j4gqm7g';
    expect(actual).toBe(expected);
  });

  test('DiI7SWRG1EM3UGKSb3Xn should be returned', () => {
    const input = 'dims/DiI7SWRG1EM3UGKSb3Xn';
    const actual = getLink(input);
    const expected = 'DiI7SWRG1EM3UGKSb3Xn';
    expect(actual).toBe(expected);
  });
});
