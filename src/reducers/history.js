/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, UNDO } from '../actions/const';

const initialState = {
  history: [],
  currentPosition: 0
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case ADD_LINE: {
      return Object.assign({}, {
        history: [...state.history, {
          type: ADD_LINE
        }],
        currentPosition: state.currentPosition + 1
      });
    }
    case UNDO: {
      if (state.currentPosition > 0) {
        return Object.assign({}, state, {
          currentPosition: state.currentPosition - 1
        });
      }
      return state;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
