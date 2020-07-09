const getAge = (birthDay) => {
  if (!(birthDay instanceof Date)) {
    throw new Error('birthDay should be instance of class Date');
  }
  return new Date().getFullYear() - birthDay.getFullYear();
};

export default getAge;
