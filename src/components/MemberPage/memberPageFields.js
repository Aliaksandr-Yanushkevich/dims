import {
  nameRegexp,
  phoneNumberRegexp,
  emailRegexp,
  textWithoutSpecialSymbolsRegexp,
  userNameRegexp,
  numberRange0To100Regexp,
  numberRange0To10Regexp,
} from '../../constants';

export const general = [
  {
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    label: 'First Name:',
    placeholder: 'First Name',
    regexp: nameRegexp,
    errorMessage: 'Field must be composed only with latin letters',
  },
  {
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    label: 'Last Name:',
    placeholder: 'Last Name',
    regexp: nameRegexp,
    errorMessage: 'Field must be composed only with latin letters',
  },
  {
    id: 'sex',
    name: 'sex',
    type: 'radio',
    label: 'Sex:',
  },
  { id: 'birthDate', name: 'birthDate', type: 'date', label: 'Birthday:' },
];

export const course = [
  {
    id: 'directionId',
    name: 'directionId',
    type: 'radio',
    label: 'Direction:',
  },
  { id: 'startDate', name: 'startDate', type: 'date', label: 'Start Date:' },
];

export const contacts = [
  {
    id: 'mobilePhone',
    name: 'mobilePhone',
    type: 'text',
    label: 'Phone:',
    placeholder: 'Phone number',
    regexp: phoneNumberRegexp,
    errorMessage: 'Only numbers and + - symbols are allowed',
  },
  {
    id: 'email',
    name: 'email',
    type: 'text',
    label: 'Email:',
    placeholder: 'Email',
    regexp: emailRegexp,
    errorMessage: 'Email is invalid',
  },
  {
    id: 'skype',
    name: 'skype',
    type: 'text',
    label: 'Skype:',
    placeholder: 'Skype account',
    regexp: userNameRegexp,
    errorMessage: 'The username must be letters, numbers, hyphens, and underscores',
  },
  {
    id: 'address',
    name: 'address',
    type: 'text',
    label: 'Address:',
    placeholder: 'Address',
    regexp: textWithoutSpecialSymbolsRegexp,
    errorMessage: 'Characters & (% # $ ^) are not allowed',
  },
];

export const educationInfo = [
  {
    id: 'education',
    name: 'education',
    type: 'text',
    label: 'Education:',
    placeholder: 'University Name:',
    regexp: textWithoutSpecialSymbolsRegexp,
    errorMessage: 'Field must be composed only with latin letters',
  },
  {
    id: 'mathScore',
    name: 'mathScore',
    type: 'number',
    label: 'Math score:',
    placeholder: 'Math test score',
    regexp: numberRange0To100Regexp,
    errorMessage: 'Math score must be between 0 and 100',
  },
  {
    id: 'universityAverageScore',
    name: 'universityAverageScore',
    type: 'number',
    step: 0.1,
    label: 'Average score:',
    placeholder: 'Diploma average score',
    regexp: numberRange0To10Regexp,
    errorMessage: 'Average score must be between 0 and 10',
  },
];
