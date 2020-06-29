import { passwordRegexp } from '../../constants';

const fields = [
  {
    id: 'oldPassword',
    name: 'oldPassword',
    label: 'Old password:',
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password:',
    regexp: passwordRegexp,
    errorMessage:
      'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers',
  },
  {
    id: 'repeatedPassword',
    name: 'repeatedPassword',
    label: 'Repeate password:',
    regexp: passwordRegexp,
    errorMessage:
      'Password must be a minimum of eight characters and contain lowercase letters, uppercase letters and numbers',
  },
];

export default fields;
