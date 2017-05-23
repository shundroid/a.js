/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { CHANGE_COLOR, CHANGE_WIDTH } from '../actions/const';

const initialState = {
  color: 'red',
  width: 20
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    /*
    case YOUR_ACTION: {
      // Modify next state depending on the action and return it
      return nextState;
    }
    */
    case CHANGE_COLOR: {
      return Object.assign({}, state, {
        color: action.parameter.color
      });
    }
    case CHANGE_WIDTH: {
      return Object.assign({}, state, {
        width: action.width
      });
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
