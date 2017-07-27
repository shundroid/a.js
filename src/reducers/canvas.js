/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, CLEAR_CANVAS, UNDO, ADD_FRAME, CHANGE_CURRENT_FRAME, REMOVE_FRAME, UPDATE_THUMBNAIL, MOVE_FRAME } from '../actions/const';
import Frame from '../constants/frame';

const initialState = {
  currentIndex: 0,
  frames: [new Frame()],
  history: [[[]]]
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case ADD_LINE: {
      const { frames, currentIndex, history } = state;
      // const nextFrames = [...frames.slice(0, currentIndex), [...frames[currentIndex], {
      //   position: action.positions,
      //   color: action.color,
      //   lineWidth: action.lineWidth
      // }], ...frames.slice(currentIndex + 1, frames.length)];
      // nextState.frames = nextFrames;
      const frame = nextState.frames[currentIndex];
      frame.lines = frame.lines.slice(0);
      console.log(frame === nextState.frames[currentIndex]);
      frame.appendLine({
        position: action.positions,
        color: action.color,
        lineWidth: action.lineWidth
      });
      updateHistory(nextState, nextState.frames);
      break;
    }
    case UNDO: {
      const historyFrames = state.history[state.history.length - 2];
      nextState.frames = historyFrames;
      nextState.history = state.history.slice(0, state.history.length - 1);
      fixCurrentIndex(nextState);
      break;
    }
    case CLEAR_CANVAS: {
      const { frames, currentIndex, history } = state;
      // const nextFrames = [
      //   ...frames.slice(0, currentIndex), [],
      //   ...frames.slice(currentIndex + 1, frames.length)
      // ];
      // nextState.frames = nextFrames;
      nextState.frames[currentIndex].clear();
      updateHistory(nextState, nextState.frames);
      break;
    }
    case ADD_FRAME: {
      const nextFrames = [...state.frames, new Frame()];
      nextState.frames = nextFrames;
      updateHistory(nextState, nextFrames);
      break;
    }
    case CHANGE_CURRENT_FRAME: {
      nextState.currentIndex = action.index;
      break;
    }
    case REMOVE_FRAME: {
      if (state.frames.length === 1) break;
      const nextFrames = state.frames.filter((f, index) => index !== action.index);
      nextState.frames = nextFrames;
      fixCurrentIndex(nextState);
      updateHistory(nextState, nextFrames);
      break;
    }
    case UPDATE_THUMBNAIL: {
      nextState.frames[action.index].updateThumbnail(action.thumbnail);
      break;
    }
    case MOVE_FRAME: {
      const frame = nextState.frames.splice(action.index, 1)[0];
      if (action.insertIndex > action.index) {
        nextState.frames.splice(action.insertIndex - 1, 0, frame);
      } else {
        nextState.frames.splice(action.insertIndex, 0, frame);
      }
      updateHistory(nextState, nextState.frames);
      break;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
  return nextState;
}

function updateHistory(nextState, nextFrames) {
  nextState.history = [...nextState.history, nextFrames];
}

function fixCurrentIndex(nextState) {
  nextState.currentIndex = Math.min(nextState.frames.length - 1, nextState.currentIndex);
}

module.exports = reducer;
