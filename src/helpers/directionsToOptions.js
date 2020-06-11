const directionsToOptions = (directions) => {
  if (directions) {
    const options = [];
    directions.forEach(({ directionId, name }) =>
      options.push({
        value: directionId,
        label: name,
      }),
    );
    return options;
  }
};

export default directionsToOptions;
