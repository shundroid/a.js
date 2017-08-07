import objectMap from '@utils/objectMap';

// States:
// { 'reducer.stateName': Type, ... }
// { 'palette.color': PropTypes.string.isRequired }
export class States {
  constructor(states) {
    const errors = validateStates(states);
    if (errors.length > 0) throw new Error(errors);

    this.states = states;
  }
  toPropTypes() {
    return objectMap(this.states, (stateName, type) => ({
      key: stateName.split('.')[1],
      value: this.states[stateName]
    }));
  }
  toConnect() {
    return state => objectMap(this.states, (stateName, type) => {
      const [reducerName, localStateName] = stateName.split('.');
      return { key: localStateName, value: state[reducerName][localStateName] };
    });
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
