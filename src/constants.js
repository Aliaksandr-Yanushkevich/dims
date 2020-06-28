export const membersTitle = ['#', 'full name', 'direction', 'education', 'start', 'age', ''];
export const membersTasksTitle = ['#', 'name', 'start', 'deadline', 'status', 'task mark'];
export const membersTasksTitleForMembers = ['#', 'name', 'start', 'deadline', 'status', ''];
export const memberProgressTitle = ['#', 'task', 'note', 'date'];
export const taskManagementTitle = ['#', 'name', 'start', 'deadline', ''];
export const tasksTrackTitle = ['#', 'task', 'note', 'date', ''];
export const requiredMessage = 'Field is required';
export const preparedGenders = [
  { value: 'male', title: 'Male' },
  { value: 'female', title: 'Female' },
];
export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const nameRegexp = /^[a-zA-Z]{1,140}$/;
export const phoneNumberRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
export const userNameRegexp = /^[a-z0-9_-]{3,50}$/;
export const textWithoutSpecialSymbolsRegexp = /[A-Za-z0-9'.\-\s,]/;
export const numberRange0To100Regexp = /^0*(?:[1-9][0-9]?|100)$/;
export const numberRange0To10Regexp = /\b([0-9]|10)\b/;
export const textMaxLength1000Regexp = /^.{1,1000}$/;
export const textMaxLength140Regexp = /^.{1,140}$/;
// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
export const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
