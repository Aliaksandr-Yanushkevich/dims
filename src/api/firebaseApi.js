import firebase from './firebase';
import createRandomMembers from '../createRandomMembers';
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

export const getLink = (path) => path.substring(path.indexOf('/') + 1);

const firebaseApi = {
  register(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(`${error.message} ${error.code}`);
      });
  },

  login(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(`${error.message} ${error.code}`);
      });
  },

  getMembers() {
    let members = [];
    return getData().then((storeMembers) => {
      storeMembers.forEach((member) => {
        const { index, firstName, lastName, age, direction, education, startDate } = member.data();
        const userId = getLink(member.ref.path);
        members = [
          ...members,
          {
            index,
            firstName,
            lastName,
            age,
            direction,
            education,
            startDate: startDate.toDate(),
            userId,
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
        const { firstName, lastName } = member.data();
        const userId = getLink(member.ref.path);
        memberNames = [
          ...memberNames,
          {
            firstName,
            lastName,
            userId,
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
      .then((querySnapshot) => {
        const { firstName, lastName, age, direction, education, startDate, tasks } = querySnapshot.data();
        return { firstName, lastName, age, direction, education, startDate: startDate.toDate(), tasks };
      });
  },

  createFakeMembers(amount) {
    return new Promise((resolve) => {
      const members = createRandomMembers(amount);
      members.forEach((member) => {
        const { firstName, lastName, direction, education, startDate, age, tasks } = member;
        firestore
          .collection(collection)
          .add({
            firstName,
            lastName,
            direction,
            education,
            startDate,
            age,
            tasks,
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
      .then((querySnapshot) => {
        const { firstName, lastName, tasks } = querySnapshot.data();
        return { firstName, lastName, tasks };
      });
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
      .then(() => {
        this.getMembers();
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
        const userId = getLink(member.ref.path);
        taskList.push({
          userId,
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
      })
      .then(() => {
        this.getMembers();
      });
  },
};

export default firebaseApi;
