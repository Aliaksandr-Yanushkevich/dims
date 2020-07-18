const prepareMembers = (users) => {
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
};

export default prepareMembers;
