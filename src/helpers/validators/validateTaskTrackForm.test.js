import validateTaskTrack from './validateTaskTrackForm';

describe('the function returns an object indicating form is valid or not', () => {
  test('{ formIsValid: true } should be returned with no empty trackNote and trackNote length under 1000 symbols', () => {
    const trackNote = 'Сheck fields and then submit the form. All fields are required';
    const actual = validateTaskTrack(trackNote);
    const expected = { formIsValid: true, message: null };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if trackNote is empty', () => {
    const trackNote = '';
    const actual = validateTaskTrack(trackNote);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if trackNote is null', () => {
    const trackNote = null;
    const actual = validateTaskTrack(trackNote);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if trackNote is undefined', () => {
    const trackNote = undefined;
    const actual = validateTaskTrack(trackNote);
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });
});
