import validateTaskPageForm from './validateTaskPageForm';

describe('the function returns an object indicating form is valid or not', () => {
  test('{ formIsValid: true } should be returned with all valid fields', () => {
    const taskName = 'admin@gmail.com';
    const description = 'Test description';
    const actual = validateTaskPageForm(taskName, description);
    const expected = { formIsValid: true };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if at least one field is empty', () => {
    const taskName = '';
    const description = 'Test description';
    const actual = validateTaskPageForm(taskName, description);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if at least one field is empty', () => {
    const taskName = 'admin@gmail.com';
    const description = '';
    const actual = validateTaskPageForm(taskName, description);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if taskName has length more 140 symbols', () => {
    const taskName =
      'Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required Сheck fields and then submit the form. All fields are required';
    const description = 'Сheck fields and then submit the form.';
    const actual = validateTaskPageForm(taskName, description);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if description has length more 1000 symbols', () => {
    const taskName = 'Сheck fields and then submit the form.';
    const description =
      'Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.Сheck fields and then submit the form.';
    const actual = validateTaskPageForm(taskName, description);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });
});
