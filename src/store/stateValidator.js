export default function stateValidatorFactory(initialState) {
  const knownKeys = Object.keys(initialState);

  return function stateValidator(newState) {
    const newKeys = Object.keys(newState);

    if (newKeys.length !== knownKeys.length) {
      throw Error('Invalid new state.');
    }

    return newState;
  };
}
