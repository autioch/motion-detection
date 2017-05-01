export default function buildStateFactory(stateValidator) {
  return function buildState(prevState, action) {
    const newState = Object.assign({}, prevState, action(prevState));

    stateValidator(newState);

    return newState;
  };
}
