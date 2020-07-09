import getUserFromSessionStorage from './getUserFromSessionStorage';
import setUserToSessionStorage from './setUserToSessionStorage';

describe('func sets userData from sessionStorage', () => {
  test('set userData from sessionStorage', () => {
    const user = { firstName: 'ALiaksandr', lastName: 'Yanushkevich', id: 1 };
    const actual = user;
    setUserToSessionStorage(user);
    const expected = getUserFromSessionStorage();
    expect(actual).toMatchObject(expected);
  });
});
