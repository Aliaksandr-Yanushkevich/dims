const directionsToOptions = (directions) => {
  if (!directions) {
    return '';
  }

  return directions.map(({ directionId, name }) => ({
    value: directionId,
    label: name,
  }));
};

export default directionsToOptions;
