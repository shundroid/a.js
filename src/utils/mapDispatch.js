import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '@actions';

// actions
// ['actionName', ...]
// ['updateThumbnail']
export class Actions {
  constructor(actions) {
    this.actions = actions;
  }
  // eslint-disable-next-line class-methods-use-this
  toPropTypes() {
    return { actions: PropTypes.object.isRequired };
  }
  toConnect() {
    return dispatch => {
      const actions = {};
      for (const action of this.actions) {
        actions[action] = actionCreators[action];
      }
      return { actions: bindActionCreators(actions, dispatch) };
    };
  }
}

export default function mapDispatch(actions) {
  return new Actions(actions);
}
