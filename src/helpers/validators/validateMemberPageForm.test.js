import validateMemberPageFrom from './validateMemberPageForm';

describe('the function returns an object indicating form is valid or not', () => {
  test('{ formIsValid: true } should be returned with all valid fields', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '12354987';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = { formIsValid: true };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if at least one field is empty', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '12354987';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if firstname does not match pattern', () => {
    const firstName = '123';
    const lastName = 'Yanushkevich';
    const mobilePhone = '12354987';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if lastname does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = '~#$';
    const mobilePhone = '12354987';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if mobilePhone does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = 'abc!';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if address does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = '!$%~';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if education does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = 'Minsk';
    const education = '!$';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if skype does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex.yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if mathScore does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 'good';
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if universityAverageScore does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 'good';
    const email = 'admin@gmail.com';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });

  test('object with field `formIsValid: false` should be returned if email does not match pattern', () => {
    const firstName = 'Aliaksandr';
    const lastName = 'Yanushkevich';
    const mobilePhone = '123456789';
    const address = 'Minsk';
    const education = 'PSU';
    const skype = 'alex_yan';
    const mathScore = 60;
    const universityAverageScore = 8.1;
    const email = 'admin@gmail.c';
    const sex = 'male';
    const birthDate = '07/03/1991';
    const startDate = '07/03/2020';
    const directionId = 1;

    const actual = validateMemberPageFrom(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );
    const expected = {
      formIsValid: false,
      message: 'Сheck fields and then submit the form. All fields are required',
      messageType: 'warning',
    };
    expect(actual).toMatchObject(expected);
  });
});
