import faker from 'faker';
import generateID from './generateID';

const createFakeTasks = (amount) => {
  return Array(amount)
    .fill()
    .map((task) => ({
      taskId: generateID(),
      name: faker.hacker.phrase(),
      description: faker.hacker.phrase(),
      startDate: faker.date.between('2020-01-01', '2020-06-01'),
      deadlineDate: faker.date.between('2020-06-02', '2020-12-31'),
    }));
};

export default createFakeTasks;
