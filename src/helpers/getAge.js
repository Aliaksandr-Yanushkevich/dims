const getAge = (birthDay) => {
  if (!(birthDay instanceof Date)) {
    throw new Error('birthDay and year should be instance of class Date');
  }
  return new Date().getFullYear() - birthDay.getFullYear();
};

export default getAge;
