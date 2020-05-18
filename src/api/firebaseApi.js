import firebase from './firebase';
import createRandomMembers from '../createRandomMembers';

const firestore = firebase.firestore();
const getData = () => {
  return firestore
    .collection('dims')
    .orderBy('firstName')
    .get();
};

const firebaseApi = {
  getMembers() {
    let members = [];
    return getData().then((storeMembers) => {
      storeMembers.forEach((member) => {
        members = [
          ...members,
          {
            index: member.data().userId,
            firstName: member.data().firstName,
            lastName: member.data().lastName,
            age: member.data().age,
            direction: member.data().direction,
            education: member.data().education,
            startDate: member.data().startDate.toDate(),
            userId: member.ref.path.substring(member.ref.path.indexOf('/') + 1),
          },
        ];
      });
      return members;
    });
  },
  createFakeMembers(amount) {
    return new Promise((resolve) => {
      const members = createRandomMembers(amount);
      members.forEach((member) => {
        firebase
          .firestore()
          .collection('dims')
          .add({
            firstName: member.firstName,
            lastName: member.lastName,
            direction: member.direction,
            education: member.education,
            startDate: member.startDate,
            age: member.age,
            tasks: member.tasks,
          })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id);
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
      resolve();
    }).then(() => {
      this.getMembers();
    });
  },
  getUserTasks(userId) {
    return firestore
      .collection('dims')
      .doc(userId)
      .get()
      .then((querySnapshot) => ({
        firstName: querySnapshot.data().firstName,
        lastName: querySnapshot.data().lastName,
        tasks: querySnapshot.data().tasks,
      }));
  },
};

export default firebaseApi;
