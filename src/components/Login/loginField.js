import { emailRegexp } from '../../constants';

const fields = [
  {
    id: 'email',
    name: 'email',
    type: 'text',
    label: 'Email:',
    placeholder: 'Email',
    regexp: emailRegexp,
    errorMessage: 'You have entered an invalid email address',
    reguired: true,
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password:',
    placeholder: 'Password',
    reguired: true,
  },
];

export default fields;
