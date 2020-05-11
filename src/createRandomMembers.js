import faker from 'faker';
import { courseDirections, universities } from './constants';

const randomFromArray = (randomNumber, array) => {
  if (randomNumber > 0 && randomNumber < 0.25) {
    return array[0];
  }
  if (randomNumber >= 0.25 && randomNumber < 0.5) {
    return array[1];
  }
  if (randomNumber >= 0.5 && randomNumber < 0.75) {
    return array[2];
  }
  return array[3];
};

const createRandomMembers = (amount) => {
  const randomMembers = [];
  for (let i = 1; i < amount + 1; i += 1) {
    const randEducation = Math.random();
    const randDirection = Math.random();
    const education = randomFromArray(randEducation, universities);
    const direction = randomFromArray(randDirection, courseDirections);
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
          taskName: faker.hacker.abbreviation(),
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
