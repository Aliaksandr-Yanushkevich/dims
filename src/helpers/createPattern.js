const createPattern = (regexp, errorMessage) => {
  if (!regexp || !errorMessage) {
    throw new Error('two required arguments must be passed to the function: regexp and errorMessage');
  }

  if (!(regexp instanceof RegExp)) {
    throw new Error('regexp should be instance of Regexp');
  }

  if (!(typeof errorMessage === 'string')) {
    throw new Error('errorMessage should be string');
  }

  return {
    value: `${regexp}`,
    errorMessage,
  };
};

export default createPattern;
