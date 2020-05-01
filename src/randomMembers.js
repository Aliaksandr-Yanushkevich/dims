import faker from 'faker';
import firebase from 'firebase';
import { DB_CONFIG } from '../../config';

firebase.initializeApp(DB_CONFIG);
var db = firebase.firestore();
export const randomMembers = () => {
  const randomMembers = [];
  for (let i = 1; i < 101; i++) {
    let education;
    let direction;
    let randEducation = Math.random();
    let randDirection = Math.random();
    if (randEducation > 0 && randEducation < 0.25) {
      education = 'PSU';
    } else if (randEducation >= 0.25 && randEducation < 0.5) {
      education = 'BSU';
    } else if (randEducation >= 0.5 && randEducation < 0.75) {
      education = 'BSUIR';
    } else {
      education = 'BNTU';
    }

    if (randDirection > 0 && randDirection < 0.25) {
      direction = 'Java';
    } else if (randDirection >= 0.25 && randDirection < 0.5) {
      direction = '.NET';
    } else if (randDirection >= 0.5 && randDirection < 0.75) {
      direction = 'Javascript';
    } else {
      direction = 'Salesforce';
    }
    randomMembers.push({
      indexNumber: i,
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      direction: direction,
      education: education,
      start_date: faker.date.between('2020-01-01', '2020-05-01'),
      age: faker.random.number({
        min: 20,
        max: 40,
      }),
    });
  }
  // console.log(Object.keys(users[0]));
  return randomMembers;
};

export default randomMembers;
