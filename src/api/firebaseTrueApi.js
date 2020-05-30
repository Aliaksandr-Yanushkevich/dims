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
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    });
  },

  createUser(userId, userInfo) {
    return firestore
      .collection('UserProfile')
      .doc(userId)
      .set({
        ...userInfo,
      })
      .catch((error) => {
        console.error('Something went wrong', error);
      });
  },

  getUsers() {
    return firestore
      .collection('UserProfile')
      .orderBy('firstName')
      .get();
  },

  getUserInfo(userId) {
    return firestore
      .collection('UserProfile')
      .doc(userId)
      .get();
  },

  getDirections() {
    return firestore
      .collection('Direction')
      .orderBy('directionId')
      .get();
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

  createTask(taskInfo) {
    const { taskId } = taskInfo;
    return firestore
      .collection('Task')
      .doc(taskId)
      .set({ ...taskInfo })
      .then(() => {
        console.log('Document written successfully');
      })
      .catch((error) => {
        console.error('Something went wrong', error);
      });
  },

  assignTask(task) {
    const { userId, taskId, userTaskId, stateId } = task;
    return firestore
      .collection('UserTask')
      .doc(userTaskId)
      .set({ userId, taskId, userTaskId, stateId });
  },

  setTaskState(stateId) {
    return firestore
      .collection('TaskState')
      .doc(stateId)
      .set({ stateId, stateName: '' });
  },

  getTask(taskId) {
    return firestore
      .collection('Task')
      .doc(taskId)
      .get();
  },

  getNames() {
    let members = [];
    return firestore
      .collection('UserProfile')
      .orderBy('firstName')
      .get()
      .then((users) => {
        users.forEach((user) => {
          const { firstName, lastName, userId } = user.data();
          members = [
            ...members,
            {
              firstName,
              lastName,
              userId,
            },
          ];
        });
        return members;
      });
  },

  getTaskList() {
    return firestore
      .collection('Task')
      .orderBy('deadlineDate', 'desc')
      .get();
  },

  getUserTaskList(userId) {
    // func returns array of {taskId, userTaskId} for current user
    const taskList = [];
    return firestore
      .collection('UserTask')
      .where('userId', '==', userId)
      .get()
      .then((tasks) => {
        tasks.forEach((task) => {
          const { taskId, userTaskId } = task.data();
          taskList.push({ taskId, userTaskId });
        });
        return taskList;
      });
  },

  getUserTaskData(taskId, userTaskId) {
    // func returns composite object from two collection (Task and TaskTrack)
    const taskData = {};
    return firestore
      .collection('Task')
      .doc(taskId)
      .get()
      .then((task) => {
        const { name } = task.data();
        taskData.name = name;
        taskData.taskId = taskId;
      })
      .then(() => {
        return firestore
          .collection('TaskTrack')
          .where('userTaskId', '==', userTaskId)
          .orderBy('trackDate', 'desc')
          .limit(1)
          .get()
          .then((taskInfo) => {
            if (taskInfo.size) {
              const { trackDate, trackNote } = taskInfo.data();
              taskData.trackDate = trackDate;
              taskData.trackNote = trackNote;
            }
            taskData.trackDate = '-';
            taskData.trackNote = '-';
          })
          .then(() => {
            return taskData;
          });
      });
  },
};

export default firebaseTrueApi;
