import faker from 'faker';
import getGender from './getGender';
import getEducation from './getEducation';
import generateID from './generateID';

const createFakeUserProfiles = (amount) => {
  const fakeUsers = [];
  for (let i = 0; i < amount; i += 1) {
    const user = {
      userId: generateID(),
      directionId: faker.random.number({
        min: 0,
        max: 3,
      }),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      sex: getGender(),
      education: getEducation(),
      birthDate: faker.date.between('1980-01-01', '2000-01-01'),
      universityAverageScore: (
        faker.random.number({
          min: 40,
          max: 100,
        }) / 10
      ).toFixed(1),
      mathScore: faker.random.number({
        min: 0,
        max: 100,
      }),
      address: faker.address.city(),
      mobilePhone: faker.phone.phoneNumberFormat(),
      skype: faker.internet.userName(),
      startDate: faker.date.between('2020-01-01', '2020-06-01'),
    };
    fakeUsers.push(user);
  }
  return fakeUsers;
};

export default createFakeUserProfiles;
