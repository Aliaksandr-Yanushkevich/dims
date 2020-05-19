import firebase from './firebase';
import createRandomMembers from '../createRandomMembers';
import dateToStringForInput from '../components/common/dateToStringForInput';
import addUserIdToEveryTask from './adduserIdToEverytask';

const firestore = firebase.firestore();
const collection = 'dims';
const getData = () => {
  return firestore
    .collection(collection)
    .orderBy('firstName')
    .get();
};
const updateData = (userId) => {
  return firestore.collection(collection).doc(userId);
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
  getNames() {
    let memberNames = [];
    return getData().then((members) => {
      members.forEach((member) => {
        memberNames = [
          ...memberNames,
          {
            firstName: member.data().firstName,
            lastName: member.data().lastName,
            userId: member.ref.path.substring(member.ref.path.indexOf('/') + 1),
          },
        ];
      });
      return memberNames;
    });
  },

  getMemberData(userId) {
    return firestore
      .collection(collection)
      .doc(userId)
      .get()
      .then((querySnapshot) => ({
        firstName: querySnapshot.data().firstName,
        lastName: querySnapshot.data().lastName,
        age: querySnapshot.data().age,
        direction: querySnapshot.data().direction,
        education: querySnapshot.data().education,
        startDate: dateToStringForInput(querySnapshot.data().startDate.toDate()),
        tasks: querySnapshot.data().tasks,
      }));
  },
  createFakeMembers(amount) {
    return new Promise((resolve) => {
      const members = createRandomMembers(amount);
      members.forEach((member) => {
        firestore
          .collection(collection)
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
      .collection(collection)
      .doc(userId)
      .get()
      .then((querySnapshot) => ({
        firstName: querySnapshot.data().firstName,
        lastName: querySnapshot.data().lastName,
        tasks: querySnapshot.data().tasks,
      }));
  },
  createMember(memberData) {
    const { firstName, lastName, age, direction, education, startDate } = memberData;
    return firestore
      .collection('dims')
      .add({
        firstName,
        lastName,
        age,
        direction,
        education,
        startDate: new Date(startDate),
        task: [],
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  },
  updateMember(userId, updatedMemberData) {
    return updateData(userId).update(updatedMemberData);
  },
  updateTasks(userId, tasks) {
    return updateData(userId).update(tasks);
  },
  getTaskList() {
    const taskList = [];
    let tasksWithId = [];
    return getData().then((membersData) => {
      membersData.forEach((member) => {
        taskList.push({
          userId: member.ref.path.substring(member.ref.path.indexOf('/') + 1),
          tasks: member.data().tasks,
        });
      });
      const temp = taskList.map((task) => addUserIdToEveryTask(task));
      temp.forEach((item) => (tasksWithId = [...tasksWithId, ...item]));
      tasksWithId.forEach((task) => {
        task.startDate = task.startDate.toDate();
        task.deadLineDate = task.deadLineDate.toDate();
      });
      return tasksWithId;
    });
  },

  deleteMember(userId) {
    return firestore
      .collection(collection)
      .doc(userId)
      .delete()
      .then(() => {
        console.log('Member deleted successfully');
      });
  },
};

export default firebaseApi;
