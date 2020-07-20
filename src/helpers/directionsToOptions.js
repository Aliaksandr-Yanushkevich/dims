const directionsToOptions = (directions) => {
  if (!directions) {
    return '';
  }
  if (!Array.isArray(directions)) {
    throw new Error('direction should be array of objects');
  }
  if (!directions.some((direction) => direction.directionId && direction.name)) {
    throw new Error('directions should be array of objects with keys directionId and name');
  }
  return directions.map(({ directionId, name }) => ({
    value: directionId,
    label: name,
  }));
};

export default directionsToOptions;
