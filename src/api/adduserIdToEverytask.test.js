import addUserIdToEveryTask from './addUserIdToEverytask';

describe('function returns task array with userId in each item within it', () => {
  test('master should be added to every task', () => {
    const tasks = [{ taskName: 'Test case' }, { taskName: 'ReactJS' }];
    const userId = 'master';
    const actual = addUserIdToEveryTask(tasks, userId);
    const expected = [
      { taskName: 'Test case', userId: 'master' },
      { taskName: 'ReactJS', userId: 'master' },
    ];
    expect(actual).toStrictEqual(expected);
  });
  test('slave should be added to every task', () => {
    const tasks = [{ taskName: 'Test case' }, { taskName: 'ReactJS' }];
    const userId = 'slave';
    const actual = addUserIdToEveryTask(tasks, userId);
    const expected = [
      { taskName: 'Test case', userId: 'slave' },
      { taskName: 'ReactJS', userId: 'slave' },
    ];
    expect(actual).toStrictEqual(expected);
  });
});
