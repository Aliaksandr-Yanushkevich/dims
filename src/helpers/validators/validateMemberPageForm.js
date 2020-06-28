import checkRequirements from './checkRequirements';
import {
  nameRegexp,
  phoneNumberRegexp,
  emailRegexp,
  textWithoutSpecialSymbolsRegexp,
  userNameRegexp,
  numberRange0To100Regexp,
  numberRange0To10Regexp,
} from '../../constants';

function validateMemberPageForm(
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
) {
  const isFilled = [...arguments].every((argument) => argument !== '');
  const firstNameIsValid = checkRequirements(nameRegexp, firstName);
  const lastNameIsValid = checkRequirements(nameRegexp, lastName);
  const phoneNumberIsValid = checkRequirements(phoneNumberRegexp, mobilePhone);
  const addressIsValid = checkRequirements(textWithoutSpecialSymbolsRegexp, address);
  const educationIsValid = checkRequirements(textWithoutSpecialSymbolsRegexp, education);
  const skypeIsValid = checkRequirements(userNameRegexp, skype);
  const mathScoreIsValid = checkRequirements(numberRange0To100Regexp, mathScore);
  const universityAverageScoreIsValid = checkRequirements(numberRange0To10Regexp, universityAverageScore);
  const emailIsValid = checkRequirements(emailRegexp, email);

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    phoneNumberIsValid &&
    addressIsValid &&
    educationIsValid &&
    skypeIsValid &&
    mathScoreIsValid &&
    universityAverageScoreIsValid &&
    emailIsValid &&
    isFilled
  ) {
    return { formIsValid: true, message: null };
  }
  return {
    formIsValid: false,
    message: 'Сheck fields and then submit the form. All fields are required',
  };
}

export default validateMemberPageForm;
