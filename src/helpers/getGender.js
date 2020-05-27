import faker from 'faker';

const getGender = () => {
  const genders = ['female', 'male'];
  return faker.random.arrayElement(genders);
};

export default getGender;
