const directionsToOptions = (directions) => {
  const options = [];
  directions.forEach(({ directionId, name }) =>
    options.push({
      value: directionId,
      title: name,
    }),
  );
  return options;
};

export default directionsToOptions;
