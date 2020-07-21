import checkRequirements from './checkRequirements';

describe('the function returns a boolean expression indicating whether the string matches the pattern or not', () => {
  test('true should be returned', () => {
    const regexp = /^\d+$/;
    const actual = checkRequirements(regexp, 12);
    const expected = true;
    expect(actual).toBe(expected);
  });

  test('false should be returned', () => {
    const regexp = /^\d+$/;
    const actual = checkRequirements(regexp, 'abc');
    const expected = false;
    expect(actual).toBe(expected);
  });

  test('undefined should be returned with regexp=undefined', () => {
    const regexp = undefined;
    const actual = checkRequirements(regexp, 'abc');
    const expected = undefined;
    expect(actual).toBe(expected);
  });

  test('undefined should be returned with regexp=null', () => {
    const regexp = null;
    const actual = checkRequirements(regexp, 'abc');
    const expected = undefined;
    expect(actual).toBe(expected);
  });

  test('false should be returned with value=undefined', () => {
    const regexp = /^\d+$/;
    const actual = checkRequirements(regexp, 'abc');
    const expected = false;
    expect(actual).toBe(expected);
  });

  test('regexp should be instance of Regexp, not number', () => {
    const regexp = 12;
    const actual = () => checkRequirements(regexp, 'abc');
    const expected = new Error('regexp should be instance of Regexp');
    expect(actual).toThrowError(expected);
  });

  test('regexp should be instance of Regexp, not string', () => {
    const regexp = 'abc';
    const actual = () => checkRequirements(regexp, 'abc');
    const expected = new Error('regexp should be instance of Regexp');
    expect(actual).toThrowError(expected);
  });

  test('regexp should be instance of Regexp, not boolean', () => {
    const regexp = true;
    const actual = () => checkRequirements(regexp, 'abc');
    const expected = new Error('regexp should be instance of Regexp');
    expect(actual).toThrowError(expected);
  });

  test('regexp should be instance of Regexp, not object', () => {
    const regexp = {};
    const actual = () => checkRequirements(regexp, 'abc');
    const expected = new Error('regexp should be instance of Regexp');
    expect(actual).toThrowError(expected);
  });
});
