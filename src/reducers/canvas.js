/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
import { ADD_LINE, CLEAR_CANVAS, UNDO, ADD_FRAME, CHANGE_CURRENT_FRAME, REMOVE_FRAME, UPDATE_THUMBNAIL, MOVE_FRAME } from '@actions/const';
import Frame, { getFrameById } from '@utils/frame';
import History from '@utils/history';
import { revert } from '@utils/compare';

const firstFrame = new Frame();
const initialState = {
  currentId: firstFrame.id,
  frames: [firstFrame],
  history: [],
  isUpdateThumbnailNeeded: false
};

function updateHistory(prevState, nextState, isCompareNeeded = true) {
  const historyItem = !isCompareNeeded ? new History(prevState.currentId) :
    History.compare(prevState.currentId, prevState.frames, nextState.frames);
  nextState.history = [...nextState.history, historyItem];
}

function fixCurrentId(nextState) {
  if (getFrameById(nextState.frames, nextState.currentId) === null) {
    nextState.currentId = nextState.frames[nextState.frames.length - 1].id;
  }
}

function reducer(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  const nextState = Object.assign({}, state);
  nextState.frames =
    nextState.frames.map(frame => new Frame(frame.lines, frame.thumbnail, frame.id));

  switch (action.type) {
    case ADD_LINE: {
      const frame = getFrameById(nextState.frames, nextState.currentId);
      frame.lines = frame.lines.slice(0);
      frame.appendLine({
        position: action.positions,
        color: action.color,
        lineWidth: action.lineWidth
      });
      updateHistory(state, nextState);
      break;
    }
    case UNDO: {
      if (nextState.history.length === 0) break;
      const history = nextState.history[state.history.length - 1];
      for (const changedFrame of history.changedFrames) {
        const frame = getFrameById(nextState.frames, changedFrame.id);
        frame.lines = revert(frame.lines, changedFrame.linesDiff);
      }
      nextState.frames = revert(nextState.frames, history.framesDiff);
      nextState.history.splice(nextState.history.length - 1, 1);
      nextState.currentId = history.currentFrameId;
      fixCurrentId(nextState);
      break;
    }
    case CLEAR_CANVAS: {
      getFrameById(nextState.frames, nextState.currentId).clear();
      updateHistory(state, nextState);
      break;
    }
    case ADD_FRAME: {
      nextState.frames = [...state.frames, new Frame()];
      updateHistory(state, nextState);
      break;
    }
    case CHANGE_CURRENT_FRAME: {
      nextState.currentId = action.id;
      nextState.isUpdateThumbnailNeeded = true;
      updateHistory(state, nextState, false);
      break;
    }
    case REMOVE_FRAME: {
      if (state.frames.length === 1) break;
      nextState.frames = state.frames.filter(frame => frame.id !== action.id);
      fixCurrentId(nextState);
      updateHistory(state, nextState);
      break;
    }
    case UPDATE_THUMBNAIL: {
      const frame = getFrameById(nextState.frames, action.id);
      if (frame === null) {
        console.warn(`Tryed to update thumbnail, but ${action.id} is invalid id.`);
        break;
      }
      nextState.isUpdateThumbnailNeeded = false;
      frame.updateThumbnail(action.thumbnail);
      break;
    }
    case MOVE_FRAME: {
      if (action.id === action.insertId) break;
      const index = nextState.frames.indexOf(getFrameById(nextState.frames, action.id));
      const insertIndex = nextState.frames.indexOf(getFrameById(nextState.frames, action.insertId));
      const frame = nextState.frames.splice(index, 1)[0];
      if (insertIndex > index) {
        nextState.frames.splice(insertIndex, 0, frame);
      } else {
        nextState.frames.splice(insertIndex - 1, 0, frame);
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

module.exports = reducer;
