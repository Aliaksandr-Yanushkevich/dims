import faker from 'faker';
import { universities } from '../constants';

const getEducation = () => {
  return faker.random.arrayElement(universities);
};

export default getEducation;
