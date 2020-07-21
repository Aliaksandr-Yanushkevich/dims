import createPattern from './createPattern';

describe('func returns object with regexp and error message', () => {
  test('object with regexp and error message should be returned', () => {
    const regexp = /^d+$/;
    const errorMessage = 'Something went wrong';
    const actual = createPattern(regexp, errorMessage);
    const expected = {
      value: `/^d+$/`,
      errorMessage: 'Something went wrong',
    };
    expect(actual).toMatchObject(expected);
  });
  test('error should be returned in case of regexp or string are not passed or at least one equals null/undefined/NaN', () => {
    const regexp = null;
    const errorMessage = 'Something went wrong';
    const actual = () => createPattern(regexp, errorMessage);
    const expected = new Error('two required arguments must be passed to the function: regexp and errorMessage');
    expect(actual).toThrowError(expected);
  });
  test('error should be returned in case of passing invalid regexp', () => {
    const regexp = 'abc';
    const errorMessage = 'Something went wrong';
    const actual = () => createPattern(regexp, errorMessage);
    const expected = new Error('regexp should be instance of Regexp');
    expect(actual).toThrowError(expected);
  });
  test('error should be returned in case of passing invalid errorMessage', () => {
    const regexp = /^d+$/;
    const errorMessage = {};
    const actual = () => createPattern(regexp, errorMessage);
    const expected = new Error('errorMessage should be string');
    expect(actual).toThrowError(expected);
  });
});
