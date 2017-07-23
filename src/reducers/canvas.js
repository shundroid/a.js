/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, CLEAR_CANVAS, UNDO, ADD_FRAME, CHANGE_CURRENT_FRAME } from '../actions/const';

const initialState = {
  currentIndex: 0,
  frames: [[]],
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
      const { frames, currentIndex, history } = state;
      return Object.assign({}, state, {
        frames: [...frames.slice(0, currentIndex), [...frames[currentIndex], {
          position: action.positions,
          color: action.color,
          lineWidth: action.lineWidth
        }], ...frames.slice(currentIndex + 1, frames.length)],
        history: [...history, frames]
      });
    }
    case UNDO: {
      return Object.assign({}, state, {
        frames: state.history[state.history.length - 1],
        history: state.history.slice(0, state.history.length - 1)
      });
    }
    case CLEAR_CANVAS: {
      const { frames, currentIndex, history } = state;
      return Object.assign({}, state, {
        frames: [
          ...frames.slice(0, currentIndex), [],
          ...frames.slice(currentIndex + 1, frames.length)
        ],
        history: [...history, frames]
      });
    }
    case ADD_FRAME: {
      return Object.assign({}, state, {
        frames: [...state.frames, []]
      });
    }
    case CHANGE_CURRENT_FRAME: {
      return Object.assign({}, state, {
        currentIndex: action.index
      });
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}

module.exports = reducer;
