import getUserFromSessionStorage from './getUserFromSessionStorage';
import setUserToSessionStorage from './setUserToSessionStorage';

describe('func gets userData from sessionStorage', () => {
  test('get userData from sessionStorage', () => {
    const user = { firstName: 'ALiaksandr', lastName: 'Yanushkevich', id: 1 };
    const actual = user;
    setUserToSessionStorage(user);
    const expected = getUserFromSessionStorage();
    expect(actual).toMatchObject(expected);
  });
  test('should returm undefined when sessionstorage does not contain user', () => {
    sessionStorage.removeItem('user');
    const actual = getUserFromSessionStorage();
    const expected = null;
    expect(actual).toBe(expected);
  });
});
