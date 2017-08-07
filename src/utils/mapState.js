// States:
// { 'reducer.stateName': Type, ... }
// { 'palette.color': PropTypes.string.isRequired }
export class States {
  constructor(states) {
    const errors = validateStates(states);
    if (errors) throw new Error(errors);

    this.states = states;
  }
  toPropTypes() {
    const propTypes = {};
    for (const stateName in this.states) {
      propTypes[stateName.split('.')[1]] = this.states[stateName];
    }
    return propTypes;
  }
  toConnect() {
    return state => {
      const states = {};
      for (const stateName in this.states) {
        const [reducerName, localStateName] = stateName.split('.');
        states[localStateName] = state[reducerName][localStateName];
      }
      return states;
    };
  }
}
export function validateStates(states) {
  const errors = [];
  for (const stateName in states) {
    if (stateName.indexOf('.') === -1) {
      errors.push(`Invalid state name: ${stateName}`);
    }
  }
  return errors;
}
export default function mapState(states) {
  return new States(states);
}
