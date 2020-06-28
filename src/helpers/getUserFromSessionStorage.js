const getUserFromSessionStorage = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};

export default getUserFromSessionStorage;
