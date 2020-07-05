const directionsToOptions = (directions) => {
  if (!directions) {
    return '';
  }

  const options = directions.map(({ directionId, name }) => {
    return {
      value: directionId,
      label: name,
    };
  });

  return options;
};

export default directionsToOptions;
