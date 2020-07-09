const setUserToSessionStorage = (member) => {
  const user = JSON.stringify(member);
  sessionStorage.setItem('user', user);
};

export default setUserToSessionStorage;
