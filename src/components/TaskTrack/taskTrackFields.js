import { textMaxLength1000Regexp } from '../../constants';

const taskTrackFields = [
  {
    id: 'trackNote',
    name: 'trackNote',
    type: 'textarea',
    label: 'Description:',
    placeholder: 'Type your note here',
    rows: 5,
    regexp: textMaxLength1000Regexp,
    errorMessage: 'Task name must be up to 1000 characters',
  },

  { id: 'trackDate', name: 'trackDate', type: 'date', label: 'Date:', disabled: true },
];

export default taskTrackFields;
