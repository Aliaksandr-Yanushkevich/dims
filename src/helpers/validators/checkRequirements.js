const checkRequirements = (regexp, value) => {
  if (regexp) {
    return regexp.test(value);
  }
  return true;
};

export default checkRequirements;
