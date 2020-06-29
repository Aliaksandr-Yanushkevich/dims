import { textMaxLength1000Regexp } from '../../constants';

const taskTrackFields = [
  {
    id: 'trackNote',
    name: 'trackNote',
    type: 'textarea',
    label: 'Description:',
    placeholder: 'Type your note here',
    rows: 10,
    regexp: textMaxLength1000Regexp,
    errorMessage: 'Task name must be up to 1000 characters',
  },

  { id: 'date', name: 'date', type: 'date', label: 'Date:', disabled: true },
];

export default taskTrackFields;
