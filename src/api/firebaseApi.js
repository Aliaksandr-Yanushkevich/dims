import firebase from './firebase';
import dateToStringForInput from '../helpers/dateToStringForInput';

const firestore = firebase.firestore();
const promiseWithMessage = (message) => {
  return new Promise((resolve) => {
    resolve({ message });
  });
};

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

  login(email, password, remember) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Successfully logged in');
      })
      .then(() => {
        return this.getRole(email);
      })
      .then((result) => {
        if (remember) {
          const user = JSON.stringify(result);
          sessionStorage.setItem('user', user);
        }
        return result;
      })
      .catch(({ message }) => ({ message }));
  },

  logout() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.removeItem('user');
        console.log('Logged out');
      })
      .catch((error) => {
        console.error('Logout error', error);
      });
  },

  updatePassword(email, oldPassword, password, repeatedPassword) {
    if (oldPassword === password) {
      return promiseWithMessage('Old and new password match');
    }

    if (password !== repeatedPassword) {
      return promiseWithMessage('New and repeated password do not match');
    }

    return this.login(email, oldPassword)
      .then(() => {
        const user = firebase.auth().currentUser;
        return user.updatePassword(password).then(() => {
          console.log('Password was successfully changed');
          return { message: null };
        });
      })
      .catch(({ message }) => ({ message }));
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
      .get()
      .then((users) => {
        const members = users.docs.map((user) => {
          const { firstName, lastName, birthDate, directionId, education, startDate, userId } = user.data();
          return {
            firstName,
            lastName,
            birthDate: birthDate.toDate(),
            directionId,
            education,
            startDate: startDate.toDate(),
            userId,
          };
        });
        return members;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getUserInfo(userId) {
    return firestore
      .collection('UserProfile')
      .doc(userId)
      .get()
      .then((userInfo) => userInfo.data())
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getDirections() {
    const directions = [];
    return firestore
      .collection('Direction')
      .orderBy('directionId')
      .get()
      .then((courseDirections) => {
        courseDirections.forEach((direction) => {
          const { directionId, name } = direction.data();
          directions.push({ directionId, name });
        });
        return directions;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
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

  assignTaskToUsers(usersWithTaskFromDB, usersWithTaskLocal, taskId, userTasks, taskInfo) {
    const difference = usersWithTaskFromDB.filter((user) => !usersWithTaskLocal.includes(user));
    return firestore
      .collection('UserTask')
      .where('taskId', '==', taskId)
      .get()
      .then((tasks) => {
        tasks.forEach((userTask) => {
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
      })
      .then(() => {
        this.createTask(taskInfo)
          .then(() => {
            userTasks.forEach((task) => {
              this.assignTask(task);
              this.setTaskState(task.stateId);
            });
          })
          .catch((error) => {
            console.error('Error with assigning task', error);
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
      .set({ stateId, stateName: 'Active' });
  },

  getTask(taskId) {
    return firestore
      .collection('Task')
      .doc(taskId)
      .get()
      .then((task) => {
        const { startDate, deadlineDate } = task.data();
        return {
          ...task.data(),
          startDate: dateToStringForInput(startDate.toDate()),
          deadlineDate: dateToStringForInput(deadlineDate.toDate()),
        };
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
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
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
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
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getTaskList() {
    return firestore
      .collection('Task')
      .orderBy('deadlineDate', 'desc')
      .get()
      .then((tasksList) => {
        const tasks = tasksList.docs.map((task) => {
          const { name, startDate, deadlineDate, taskId } = task.data();
          return { name, startDate: startDate.toDate(), deadlineDate: deadlineDate.toDate(), taskId };
        });
        return tasks;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  getUserTaskList(userId) {
    // func returns array of {taskId, userTaskId, stateId} for current user
    return firestore
      .collection('UserTask')
      .where('userId', '==', userId)
      .get()
      .then((tasks) => {
        const taskList = tasks.docs.map((task) => {
          const { taskId, userTaskId, stateId } = task.data();
          return { taskId, userTaskId, stateId };
        });
        return taskList;
      })
      .then(async (taskList) => {
        const promiseArray = taskList.map(async (task) => {
          const { taskId, userTaskId, stateId } = task;
          const taskInfo = await this.getUserTaskData(taskId, userTaskId, stateId);
          return taskInfo;
        });
        const taskData = Promise.all(promiseArray);
        return taskData;
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
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
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  trackTask(userTaskId, taskTrackId, trackDate, trackNote) {
    return firestore
      .collection('TaskTrack')
      .doc(taskTrackId)
      .set({ userTaskId, taskTrackId, trackDate, trackNote })
      .catch((error) => {
        console.error(`Error writting data: ${error}`);
      });
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
    return firestore
      .collection('TaskTrack')
      .where('userTaskId', '==', userTaskId)
      .get()
      .then((taskDetail) => {
        const trackInfo = taskDetail.docs.map((detail) => {
          const track = {};
          const { trackDate, trackNote, taskTrackId } = detail.data();
          track.trackDate = trackDate.toDate();
          track.trackNote = trackNote;
          track.taskTrackId = taskTrackId;
          track.userTaskId = userTaskId;
          return track;
        });
        return trackInfo;
      })
      .then(async (trackInfo) => {
        const taskName = await this.getTaskName(userTaskId);
        const trackData = trackInfo.map((track) => {
          return { ...track, taskName };
        });
        return trackData;
      });
  },

  getTrackDataArray(userId) {
    const trackData = [];
    return this.getUserTaskList(userId)
      .then(async (tracks) => {
        const promiseArray = tracks.map(async (track) => {
          const { userTaskId } = track;
          const trackInfo = await this.getTrackData(userTaskId);
          return [...trackInfo];
        });
        const trackArray = await Promise.all(promiseArray);
        return trackArray;
      })
      .then((trackArray) => {
        const trackSet = trackArray.filter((track) => {
          return track.length !== 0;
        });
        trackSet.forEach((tracks) => {
          tracks.forEach((track) => {
            trackData.push(track);
          });
        });
        return trackData;
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
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  },

  completeTask(currentTaskId, stateName) {
    firestore
      .collection('TaskState')
      .doc(currentTaskId)
      .update({ stateName })
      .then(() => {
        console.log('task is completed');
      })
      .catch((error) => {
        console.error(`Something went wrong: ${error}`);
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
        })
        .then(() => {
          console.log('User and all his data succesfully deleted');
        })
        .catch((error) => {
          console.error(`Error removing member: ${error}`);
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
              })
              .then(() => console.log('Task is removed successfully'))
              .catch((error) => console.error('Problem with removing task', error));
          });
        });
    });
  },

  deleteItemWithId(collection, docId) {
    debugger;
    if (docId) {
      return firestore
        .collection(collection)
        .doc(docId)
        .delete()
        .then(() => {
          console.log('Track note deleted successfully');
        })
        .catch((error) => {
          console.error('Problem with note removing', error);
        });
    }
  },
};

export default firebaseApi;
