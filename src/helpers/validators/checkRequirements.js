const checkRequirements = (regexp, value) => {
  if (regexp) {
    return regexp.test(value);
  }
};

export default checkRequirements;
