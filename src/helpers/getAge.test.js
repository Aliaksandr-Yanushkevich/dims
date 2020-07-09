import getAge from './getAge';

describe('func returns age in years', () => {
  test('29 should be returnded', () => {
    const birthDay = new Date('July 3, 1991');
    const actual = getAge(birthDay);
    const expected = 29;
    expect(actual).toBe(expected);
  });

  test('birthDay should be instance of class Date, not number', () => {
    const birthDay = 3;
    const actual = () => getAge(birthDay);
    const expected = new Error('birthDay should be instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('birthDay should be instance of class Date, not string', () => {
    const birthDay = 'abc';
    const actual = () => getAge(birthDay);
    const expected = new Error('birthDay should be instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('birthDay should be instance of class Date, not array', () => {
    const birthDay = [1, 2, 3];
    const actual = () => getAge(birthDay);
    const expected = new Error('birthDay should be instance of class Date');
    expect(actual).toThrowError(expected);
  });

  test('date should instance of class Date, not boolean', () => {
    const birthDay = true;
    const actual = () => getAge(birthDay);
    const expected = new Error('birthDay should be instance of class Date');
    expect(actual).toThrowError(expected);
  });
});
