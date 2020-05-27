const addUserIdToEveryTask = (tasks, userId) => {
  return tasks.map((task) => ({ ...task, userId }));
};

export default addUserIdToEveryTask;
