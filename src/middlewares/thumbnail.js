import {
  ADD_LINE, CLEAR_CANVAS, ADD_FRAME, MOVE_FRAME, REMOVE_FRAME, UNDO,
  CHANGE_CURRENT_FRAME, TOGGLE_PLAY
} from '@actions/const';
import { requestUpdateThumbnail } from '@actions';

const needUpdateActions = {
  changeCurrentFrame: [ADD_LINE, CLEAR_CANVAS, UNDO],
  togglePlay: [
    ADD_LINE,
    CLEAR_CANVAS,
    ADD_FRAME,
    MOVE_FRAME,
    REMOVE_FRAME,
    UNDO
  ]
};

let isNeedUpdate = {
  changeCurrentFrame: false,
  togglePlay: false
};

const thumbnail = store => next => action => {
  if (needUpdateActions.changeCurrentFrame.indexOf(action.type) !== -1) {
    isNeedUpdate.changeCurrentFrame = true;
  }
  if (needUpdateActions.togglePlay.indexOf(action.type) !== -1) {
    isNeedUpdate.togglePlay = true;
  }
  if (action.type === CHANGE_CURRENT_FRAME && isNeedUpdate.changeCurrentFrame) {
    store.dispatch(requestUpdateThumbnail());
  }
  if (action.type === TOGGLE_PLAY && isNeedUpdate.togglePlay) {
    store.dispatch(requestUpdateThumbnail());
  }
  next(action);
};

export default thumbnail;
