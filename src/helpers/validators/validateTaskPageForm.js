import checkRequirements from './checkRequirements';
import { textMaxLength1000Regexp, textMaxLength140Regexp } from '../../constants';

function validateTaskPageForm(taskName, description) {
  const allIsFilled = [...arguments].every((argument) => argument !== '');
  const taskNameIsValid = checkRequirements(textMaxLength140Regexp, taskName);
  const descriptionIsValid = checkRequirements(textMaxLength1000Regexp, description);

  if (allIsFilled && taskNameIsValid && descriptionIsValid) {
    return { formIsValid: true };
  }
  return {
    formIsValid: false,
    message: 'Сheck fields and then submit the form. All fields are required',
    messageType: 'warning',
  };
}

export default validateTaskPageForm;
