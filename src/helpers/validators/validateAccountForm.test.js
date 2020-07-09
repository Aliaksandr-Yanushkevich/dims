import validateAccountForm from './validateAccountForm';

describe('the function returns an object indicating form is valid or not', () => {
  test('{ formIsValid: true, message: null } should be returned with equal passwords and matching the pattern', () => {
    const password = 'Incubator2020';
    const repeatedPassword = 'Incubator2020';
    const actual = validateAccountForm(password, repeatedPassword);
    const expected = { formIsValid: true, message: null };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with equal passwords but without matching the pattern', () => {
    const password = 'incubator';
    const repeatedPassword = 'incubator';
    const actual = validateAccountForm(password, repeatedPassword);
    const expected = {
      formIsValid: false,
      message: 'The password does not meet the requirements or the password and the repeated password do not match',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with not equal passwords', () => {
    const password = 'incubator127';
    const repeatedPassword = 'incubator';
    const actual = validateAccountForm(password, repeatedPassword);
    const expected = {
      formIsValid: false,
      message: 'The password does not meet the requirements or the password and the repeated password do not match',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with empty passwords', () => {
    const password = '';
    const repeatedPassword = '';
    const actual = validateAccountForm(password, repeatedPassword);
    const expected = {
      formIsValid: false,
      message: 'The password does not meet the requirements or the password and the repeated password do not match',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });
});
