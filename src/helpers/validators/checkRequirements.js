const checkRequirements = (regexp, value) => {
  if (regexp) {
    if (!(regexp instanceof RegExp)) {
      throw new Error('regexp should be instance of Regexp');
    }
    return regexp.test(value);
  }
};

export default checkRequirements;
