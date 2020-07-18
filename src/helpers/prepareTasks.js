const prepareTasks = (issues) => {
  return issues.docs.map((issue) => {
    const { name, startDate, deadlineDate, taskId } = issue.data();
    return { name, startDate: startDate.toDate(), deadlineDate: deadlineDate.toDate(), taskId };
  });
};

export default prepareTasks;
