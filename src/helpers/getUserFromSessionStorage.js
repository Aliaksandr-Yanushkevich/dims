const getUserFromSessionStorage = () => JSON.parse(sessionStorage.getItem('user'));

export default getUserFromSessionStorage;
