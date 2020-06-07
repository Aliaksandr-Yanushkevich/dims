import firebase from './firebase';

const firestore = firebase.firestore();

const firebaseApi = {
  createUser(userId, userInfo) {
    return firestore
      .collection('UserProfile')
      .doc(userId)
      .set({
        ...userInfo,
      })
      .then(() => {
        const { email } = userInfo;
        this.register(email, 'incubator');
        return email;
      })
      .then((userEmail) => {
        const { firstName, lastName } = userInfo;
        firestore
          .collection('Roles')
          .doc(userId)
          .set({ userId, email: userEmail, role: 'member', firstName, lastName });
      })
      .then(() => {
        console.log('User created successfully');
      })
      .catch((error) => {
        console.error('Something went wrong when user creation', error);
      });
  },

  register(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(`${error.message} ${error.code}`);
      });
  },

  login(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Successfully logged in');
      });
  },

  logout() {
    return firebase.auth().signOut();
  },

  updatePassword(newPassword) {
    const user = firebase.auth().currentUser;
    return user.updatePassword(newPassword);
  },

  getRole(email) {
    const userData = {};
    return firestore
      .collection('Roles')
      .where('email', '==', email)
      .get()
      .then((users) => {
        users.forEach((user) => {
          const { role, userId, firstName, lastName } = user.data();
          userData.role = role;
          userData.userId = userId;
          userData.firstName = firstName;
          userData.lastName = lastName;
          userData.email = email;
        });
      })
      .then(() => userData);
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

  removeTaskFromUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId) {
    const difference = usersWithTaskFromDB.filter((user) => !usersWithTaskLocal.includes(user));
    return firestore
      .collection('UserTask')
      .where('taskId', '==', taskId)
      .get()
      .then((userTasks) => {
        userTasks.forEach((userTask) => {
          const { userId, userTaskId, stateId } = userTask.data();
          if (difference.includes(userId)) {
            this.deleteItemWithId('UserTask', userTaskId).then(() => {
              this.deleteItemWithId('TaskState', stateId).then(() => {
                firestore
                  .collection('TaskTrack')
                  .where('userTaskId', '==', userTaskId)
                  .get()
                  .then((taskStates) => {
                    taskStates.forEach((taskState) => {
                      const { taskTrackId } = taskState.data();
                      this.deleteItemWithId('TaskTrack', taskTrackId);
                    });
                  });
              });
            });
          }
        });
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

  getUsersWithTask(taskId) {
    // func returns array of userIds which have current task
    const usersWithTask = [];
    return firestore
      .collection('UserTask')
      .where('taskId', '==', taskId)
      .get()
      .then((users) => {
        users.forEach((user) => {
          const { userId } = user.data();
          usersWithTask.push(userId);
        });
      })
      .then(() => {
        return usersWithTask;
      });
  },

  getTaskList() {
    return firestore
      .collection('Task')
      .orderBy('deadlineDate', 'desc')
      .get();
  },

  getUserTaskList(userId) {
    // func returns array of {taskId, userTaskId, staeId} for current user
    const taskList = [];
    return firestore
      .collection('UserTask')
      .where('userId', '==', userId)
      .get()
      .then((tasks) => {
        tasks.forEach((task) => {
          const { taskId, userTaskId, stateId } = task.data();
          taskList.push({ taskId, userTaskId, stateId });
        });
        return taskList;
      });
  },

  getUserTaskData(taskId, userTaskId, stateId) {
    // func returns composite object from different collection
    const taskData = {};
    return firestore
      .collection('Task')
      .doc(taskId)
      .get()
      .then((task) => {
        const { name, startDate, deadlineDate } = task.data();
        taskData.name = name;
        taskData.taskId = taskId;
        taskData.userTaskId = userTaskId;
        taskData.startDate = startDate.toDate();
        taskData.deadlineDate = deadlineDate.toDate();
        taskData.stateId = stateId;
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
              taskInfo.forEach((task) => {
                const { trackDate, trackNote } = task.data();
                taskData.trackDate = trackDate.toDate();
                taskData.trackNote = trackNote;
              });
            } else {
              taskData.trackDate = '-';
              taskData.trackNote = '-';
            }
          })
          .then(() => {
            return firestore
              .collection('TaskState')
              .doc(stateId)
              .get()
              .then((taskState) => {
                const { stateName } = taskState.data();
                taskData.stateName = stateName;
              });
          })
          .then(() => {
            return taskData;
          });
      });
  },

  trackTask(userTaskId, taskTrackId, trackDate, trackNote) {
    return firestore
      .collection('TaskTrack')
      .doc(taskTrackId)
      .set({ userTaskId, taskTrackId, trackDate, trackNote });
  },

  getTaskName(userTaskId) {
    return firestore
      .collection('UserTask')
      .doc(userTaskId)
      .get()
      .then((taskData) => {
        const { taskId } = taskData.data();
        return taskId;
      })
      .then((id) => {
        return firestore
          .collection('Task')
          .doc(id)
          .get()
          .then((taskInfo) => {
            const { name } = taskInfo.data();
            return name;
          });
      });
  },

  getTrackData(userTaskId) {
    const trackInfo = [];
    return firestore
      .collection('TaskTrack')
      .where('userTaskId', '==', userTaskId)
      .get()
      .then((taskDetail) => {
        taskDetail.forEach((detail) => {
          const track = {};
          const { trackDate, trackNote, taskTrackId } = detail.data();
          track.trackDate = trackDate.toDate();
          track.trackNote = trackNote;
          track.taskTrackId = taskTrackId;
          track.userTaskId = userTaskId;
          trackInfo.push(track);
        });
      })
      .then(() => {
        return trackInfo.length ? trackInfo : null;
      });
  },

  getTaskTrack(taskTrackId) {
    return firestore
      .collection('TaskTrack')
      .doc(taskTrackId)
      .get()
      .then((taskData) => {
        const { trackNote } = taskData.data();
        return trackNote;
      });
  },

  completeTask(currentTaskId, stateName) {
    firestore
      .collection('TaskState')
      .doc(currentTaskId)
      .update({ stateName })
      .then(() => {
        console.log('task is completed');
      });
  },

  deleteUser(userId) {
    return this.deleteItemWithId('UserProfile', userId).then(() => {
      firestore
        .collection('UserTask')
        .where('userId', '==', userId)
        .get()
        .then((tasks) => {
          tasks.forEach((task) => {
            const { userTaskId, stateId } = task.data();
            this.deleteItemWithId('UserTask', userTaskId);
            this.deleteItemWithId('TaskState', stateId);
            return firestore
              .collection('TaskTrack')
              .where('userTaskId', '==', userTaskId)
              .get()
              .then((trackedTasks) => {
                trackedTasks.forEach((trackedtask) => {
                  const { taskTrackId } = trackedtask.data();
                  this.deleteItemWithId('TaskTrack', taskTrackId);
                });
              });
          });
        });
    });
  },

  deleteTask(taskId) {
    return this.deleteItemWithId('Task', taskId).then(() => {
      firestore
        .collection('UserTask')
        .where('taskId', '==', taskId)
        .get()
        .then((tasks) => {
          tasks.forEach((task) => {
            const { userTaskId, stateId } = task.data();
            this.deleteItemWithId('UserTask', userTaskId);
            this.deleteItemWithId('TaskState', stateId);
            return firestore
              .collection('TaskTrack')
              .where('userTaskId', '==', userTaskId)
              .get()
              .then((trackedTasks) => {
                trackedTasks.forEach((trackedtask) => {
                  const { taskTrackId } = trackedtask.data();
                  this.deleteItemWithId('TaskTrack', taskTrackId);
                });
              });
          });
        });
    });
  },

  deleteItemWithId(collection, docId) {
    if (docId) {
      return firestore
        .collection(collection)
        .doc(docId)
        .delete();
    }
  },
};

export default firebaseApi;
