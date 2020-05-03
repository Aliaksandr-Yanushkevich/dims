// this file create fake array of members. to execute it type 'node createMembers.js' in terminal
const faker = require('faker');
const firebase = require('firebase');

firebase.initializeApp({
  apiKey: 'AIzaSyDV4IDfONrReT7uzjBifh3x_aGX0XCwlvY',
  authDomain: 'dims-cffff.firebaseapp.com',
  databaseURL: 'https://dims-cffff.firebaseio.com',
  projectId: 'dims-cffff',
  storageBucket: 'dims-cffff.appspot.com',
  messagingSenderId: '582615367771',
  appId: '1:582615367771:web:361ecb0042b66239c9bf7e',
  measurementId: 'G-HC1Q9WCWBJ',
});
const createMembers = () => {
  const randomMembers = [];
  for (let i = 1; i < 21; i += 1) {
    let education;
    let direction;
    const randEducation = Math.random();
    const randDirection = Math.random();

    const tasks = Array(
      faker.random.number({
        min: 1,
        max: 5,
      }),
    )
      .fill()
      .map((el, index) => {
        return {
          taskId: index + 1,
          taskName: faker.hacker.abbreviation(),
          description: faker.hacker.phrase(),
          startDate: faker.date.between('2020-01-01', '2020-06-01'),
          deadLineDate: faker.date.between('2020-06-02', '2020-12-31'),
          status: '',
        };
      });

    const startDate = faker.date.between('2020-01-01', '2020-05-01');

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
      userId: i,
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

createMembers().forEach((el) => {
  firebase
    .firestore()
    .collection('dims')
    .add({
      userId: el.userId,
      firstName: el.firstName,
      lastName: el.lastName,
      direction: el.direction,
      education: el.education,
      startDate: el.startDate,
      age: el.age,
      tasks: el.tasks,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
});
