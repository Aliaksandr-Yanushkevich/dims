import checkRequirements from './checkRequirements';
import { passwordRegexp } from '../../constants';

const validateAccountForm = (password, repeatedPassword) => {
  if (checkRequirements(passwordRegexp, password) && password === repeatedPassword) {
    return { formIsValid: true, message: null };
  }
  return {
    formIsValid: false,
    message: 'The password does not meet the requirements or the password and the repeated password do not match',
    messageType: 'warning',
  };
};

export default validateAccountForm;
