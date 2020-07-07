import validateLoginForm from './validateLoginForm';

describe('the function returns an object indicating form is valid or not', () => {
  test('{ formIsValid: true, message: null } should be returned with valid email', () => {
    const email = 'admin@gmail.com';
    const actual = validateLoginForm(email);
    const expected = { formIsValid: true, message: null };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with with invalid email', () => {
    const email = 'admin@gmail.c';
    const actual = validateLoginForm(email);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with with emty email', () => {
    const email = '';
    const actual = validateLoginForm(email);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with with undefined like email', () => {
    const email = undefined;
    const actual = validateLoginForm(email);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned with with null like email', () => {
    const email = null;
    const actual = validateLoginForm(email);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });
});
