/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, CLEAR_CANVAS, UNDO, ADD_FRAME, CHANGE_CURRENT_FRAME, REMOVE_FRAME, UPDATE_THUMBNAIL, MOVE_FRAME } from '../actions/const';
import Frame from '../constants/frame';
import History from '../constants/history';
import { revert } from '../constants/compare';
import getFrameById from '../constants/getFrameById';

const initialState = {
  currentIndex: 0,
  frames: [new Frame()],
  history: []
};

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state);
  nextState.frames = nextState.frames.map(frame => new Frame(frame.lines, frame.thumbnail, frame.originalId));

  switch (action.type) {
    case ADD_LINE: {
      const { frames, currentIndex, history } = state;
      const frame = nextState.frames[currentIndex];
      frame.lines = frame.lines.slice(0);
      const newLine = {
        position: action.positions,
        color: action.color,
        lineWidth: action.lineWidth
      };
      frame.appendLine(newLine);
      updateHistory(state, nextState);
      break;
    }
    case UNDO: {
      const history = nextState.history[state.history.length - 1];
      for (let changedFrame of history.changedFrames) {
        const frame = getFrameById(nextState.frames, changedFrame.originalId);
        frame.lines = revert(frame.lines, changedFrame.linesDiff);
      }
      nextState.frames = revert(nextState.frames, history.framesDiff);
      nextState.history.splice(nextState.history.length - 1, 1);
      nextState.currentIndex = history.currentFrameIndex;
      fixCurrentIndex(nextState);
      nextState.currentIndex = history.currentFrameIndex;
      break;
    }
    case CLEAR_CANVAS: {
      const { frames, currentIndex, history } = state;
      const lines = nextState.frames[currentIndex].lines;
      nextState.frames[currentIndex].clear();
      updateHistory(state, nextState);
      break;
    }
    case ADD_FRAME: {
      const nextFrames = [...state.frames, new Frame()];
      nextState.frames = nextFrames;
      updateHistory(state, nextState);
      break;
    }
    case CHANGE_CURRENT_FRAME: {
      nextState.currentIndex = action.index;
      nextState.history = [...nextState.history, new History(state.currentIndex)];
      break;
    }
    case REMOVE_FRAME: {
      if (state.frames.length === 1) break;
      let removeFrame = null;
      const nextFrames = state.frames.filter((f, index) => {
        if (index !== action.index) {
          return true;
        }
        removeFrame = f;
        return false;
      });
      if (removeFrame === null) {
        throw new Error(`The frame to remove was not found. index: ${index}`);
      }
      nextState.frames = nextFrames;
      fixCurrentIndex(nextState);
      updateHistory(state, nextState);
      break;
    }
    case UPDATE_THUMBNAIL: {
      nextState.frames[action.index].updateThumbnail(action.thumbnail);
      break;
    }
    case MOVE_FRAME: {
      if (action.index === action.insertIndex) break;
      const frame = nextState.frames.splice(action.index, 1)[0];
      if (action.insertIndex > action.index) {
        nextState.frames.splice(action.insertIndex, 0, frame);
      } else {
        nextState.frames.splice(action.insertIndex - 1, 0, frame);
      }
      updateHistory(state, nextState);
      break;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
  return nextState;
}

function updateHistory(prevState, nextState) {
  nextState.history = [...nextState.history, History.compare(
    nextState.currentIndex, prevState.frames, nextState.frames)];
}

function fixCurrentIndex(nextState) {
  nextState.currentIndex = Math.min(nextState.frames.length - 1, nextState.currentIndex);
}

module.exports = reducer;
