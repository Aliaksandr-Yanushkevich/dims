const getGender = () => {
  const genders = ['female', 'male'];
  const random = Math.random();
  // simple custom randomizer to return random value from array contained from two values
  if (random < 0.5) {
    return genders[0];
  }
  return genders[1];
};

export default getGender;
