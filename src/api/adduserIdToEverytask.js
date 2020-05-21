const addUserIdToEveryTask = (taskList) => {
  return taskList.tasks.map((task) => ({ ...task, userId: taskList.userId }));
};

export default addUserIdToEveryTask;
