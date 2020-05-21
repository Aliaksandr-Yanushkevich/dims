import faker from 'faker';
import { courseDirections, universities } from './constants';

const randomFromArray = (array) => {
  // randomNumber will be between 0 and array length
  const randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber];
};

const createRandomMembers = (amount) => {
  const randomMembers = [];
  for (let i = 1; i < amount + 1; i += 1) {
    const education = randomFromArray(universities);
    const direction = randomFromArray(courseDirections);
    const tasks = Array(
      faker.random.number({
        min: 1,
        max: 5,
      }),
    )
      .fill()
      .map((task, index) => {
        return {
          taskId: index,
          taskName: faker.hacker.phrase(),
          description: faker.hacker.phrase(),
          startDate: faker.date.between('2020-01-01', '2020-06-01'),
          deadLineDate: faker.date.between('2020-06-02', '2020-12-31'),
          status: '',
        };
      });

    const startDate = faker.date.between('2020-01-01', '2020-05-01');

    randomMembers.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      direction,
      education,
      startDate,
      age: faker.random.number({
        min: 20,
        max: 40,
      }),
      tasks,
    });
  }
  return randomMembers;
};

export default createRandomMembers;
