import checkRequirements from './checkRequirements';
import { emailRegexp } from '../../constants';

const validateLoginForm = (email) => {
  if (checkRequirements(emailRegexp, email)) {
    return { formIsValid: true, message: null };
  }
  return {
    formIsValid: false,
    message: 'Сheck fields and then submit the form',
    messageType: 'warning',
  };
};

export default validateLoginForm;
