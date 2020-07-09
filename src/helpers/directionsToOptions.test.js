import directionsToOptions from './directionsToOptions';

describe('func transform array with object for best usability in select inputs', () => {
  test('[{value: 0, label: Java}, {value: 1, label: JavaScript}] should be returned when array has valid structure [{directionId, name}]', () => {
    const directions = [
      { directionId: 0, name: 'Java' },
      { directionId: 1, name: 'JavaScript' },
    ];
    const actual = directionsToOptions(directions);
    const expected = [
      { value: 0, label: 'Java' },
      { value: 1, label: 'JavaScript' },
    ];
    expect(actual).toMatchObject(expected);
  });

  test('Error (direction should be array of objects) should be returned with non-array argument', () => {
    const directions = 'directions';
    const actual = () => directionsToOptions(directions);
    const expected = new Error('direction should be array of objects');
    expect(actual).toThrowError(expected);
  });

  test('Error (directions should be array of objects with keys directionId and name) should be returned with invalid structured array', () => {
    const directions = [{}];
    const actual = () => directionsToOptions(directions);
    const expected = new Error('directions should be array of objects with keys directionId and name');
    expect(actual).toThrowError(expected);
  });
});
