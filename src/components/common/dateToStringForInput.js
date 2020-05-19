const dateToStringForInput = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('date should instance of class Date');
  }
  // if the number of the month or date is less than 10, zero is pasted before the number
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  // the value returned by the getMonth () method is an integer from 0 to 11. 0=January, 1=February, and so on.
  // for greater comfort for the user, add 1 to the number of the month, i.e. January=1, February=2, etc.
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
export default dateToStringForInput;
