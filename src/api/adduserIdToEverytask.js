const addUserIdToEveryTask = (taskList) => {
  const tasks = { ...taskList };
  tasks.tasks.forEach((task) => {
    task.userId = taskList.userId;
  });
  //   debugger;
  return tasks.tasks;
};

export default addUserIdToEveryTask;
