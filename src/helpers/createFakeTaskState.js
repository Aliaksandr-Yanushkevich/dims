import generateID from './generateID';

const createFakeTaskState = (amount) => {
  return Array(amount)
    .fill()
    .map((task) => ({ stateId: generateID(), stateName: 'In progress' }));
};

export default createFakeTaskState;
