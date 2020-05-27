import firebase from './firebase';
import createFakeUserProfiles from '../helpers/createFakeUserProfiles';
import createFakeTasks from '../helpers/createFakeTasks';
import createFakeTaskState from '../helpers/createFakeTaskState';

const firestore = firebase.firestore();

const firebaseTrueApi = {
  createUserProfiles(amount) {
    const profiles = createFakeUserProfiles(amount);
    profiles.forEach((profile) => {
      const {
        userId,
        directionId,
        firstName,
        lastName,
        email,
        sex,
        education,
        birthDate,
        universityAverageScore,
        mathScore,
        address,
        mobilePhone,
        skype,
        startDate,
      } = profile;
      firestore
        .collection('UserProfile')
        .doc(userId)
        .set({
          userId,
          directionId,
          firstName,
          lastName,
          email,
          sex,
          education,
          birthDate,
          universityAverageScore,
          mathScore,
          address,
          mobilePhone,
          skype,
          startDate,
        });
      firestore
        .collection('UserTask')
        .doc(userId)
        .set({ userId })
        .then(() => {
          console.log('Document written successfully');
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    });
  },
  getUsers() {
    return firestore
      .collection('UserProfile')
      .orderBy('firstName')
      .get();
  },

  getDirections() {
    return firestore
      .collection('Direction')
      .orderBy('directionId')
      .get();
  },
  pushUserIds() {
    firestore
      .collection('UserProfile')
      .orderBy('firstName')
      .get()
      .then((users) => {
        users.forEach((user) => {
          const { userId } = user.data();
          firestore
            .collection('UserTask')
            .doc(userId)
            .set({ userId })
            .then(() => {
              console.log('Document written successfully');
            })
            .catch((error) => {
              console.error('Something went wrong', error);
            });
        });
      });
  },
  createTaskState(amount) {
    const taskStates = createFakeTaskState(amount);
    taskStates.forEach((task) => {
      const { stateId, stateName } = task;
      firestore
        .collection('TaskState')
        .doc(stateId)
        .set({ stateId, stateName })
        .then(() => {
          console.log('Document written successfully');
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    });
  },
  createTasks(amount) {
    const tasks = createFakeTasks(amount);
    tasks.forEach((task) => {
      const { taskId, name, description, startDate, deadlineDate } = task;
      firestore
        .collection('Task')
        .doc(taskId)
        .set({ taskId, name, description, startDate, deadlineDate })
        .then(() => {
          console.log('Document written successfully');
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    });
  },
};

export default firebaseTrueApi;
