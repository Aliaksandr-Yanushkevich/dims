import checkRequirements from './checkRequirements';
import { textMaxLength1000Regexp } from '../../constants';

const validateTaskTrack = (trackNote) => {
  if (trackNote) {
    if (checkRequirements(textMaxLength1000Regexp, trackNote)) {
      return { formIsValid: true, message: null };
    }
  }

  return {
    formIsValid: false,
    message: 'Сheck fields and then submit the form',
    messageType: 'warning',
  };
};

export default validateTaskTrack;
