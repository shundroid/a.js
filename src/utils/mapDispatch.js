import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actionCreators from '@actions';
import { objectMapFromArray } from '@utils/objectMap';

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
    return dispatch => ({
      actions: bindActionCreators(
        objectMapFromArray(this.actions,
          action => ({ key: action, value: actionCreators[action] })),
        dispatch
      )
    });
  }
}

export default function mapDispatch(...actions) {
  return new Actions(actions);
}
