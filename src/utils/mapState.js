// States:
// { 'reducer.stateName': Type, ... }
// { 'palette.color': PropTypes.string.isRequired }
export class States {
  constructor(states) {
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
export default function mapState(states) {
  return new States(states);
}
