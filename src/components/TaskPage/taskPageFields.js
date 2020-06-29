import { textMaxLength1000Regexp, textMaxLength140Regexp } from '../../constants';

const taskPageFields = [
  {
    id: 'taskName',
    name: 'taskName',
    type: 'textarea',
    label: 'Task name:',
    placeholder: 'Task name',
    regexp: textMaxLength140Regexp,
    cols: 30,
    rows: 1,
    errorMessage: 'Task name must be up to 140 characters',
  },
  {
    id: 'description',
    name: 'description',
    type: 'textarea',
    label: 'Description:',
    placeholder: 'Task description',
    regexp: textMaxLength1000Regexp,
    errorMessage: 'Task name must be up to 1000 characters',
  },
  { id: 'startDate', name: 'startDate', type: 'date', label: 'Start:' },
  { id: 'deadlineDate', name: 'deadlineDate', type: 'date', label: 'Deadline:' },
];

export default taskPageFields;
