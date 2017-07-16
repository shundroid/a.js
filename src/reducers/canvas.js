/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, REMOVE_LINE, UNDO } from '../actions/const';

const initialState = {
  lines: [],
  history: []
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
    case ADD_LINE: {
      return Object.assign({}, state, {
        lines: [...state.lines, {
          position: action.positions,
          color: action.color,
          lineWidth: action.lineWidth
        }],
        history: [...state.history, state.lines]
      });
    }
    case UNDO: {
      return Object.assign({}, state, {
        lines: state.history[state.history.length - 1],
        history: state.history.slice(0, state.history.length - 1)
      });
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
