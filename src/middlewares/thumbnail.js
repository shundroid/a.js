import {
  ADD_LINE, CLEAR_CANVAS, UNDO,
  CHANGE_CURRENT_FRAME, TOGGLE_PLAY,
  UPDATE_THUMBNAIL
} from '@actions/const';
import { requestUpdateThumbnail } from '@actions';

const needUpdateActions = [ADD_LINE, CLEAR_CANVAS, UNDO];
const updateActions = [CHANGE_CURRENT_FRAME, TOGGLE_PLAY];

let isNeedUpdate = false;

const thumbnail = store => next => action => {
  if (action.type === UPDATE_THUMBNAIL) {
    isNeedUpdate = false;
  }
  if (needUpdateActions.indexOf(action.type) !== -1) {
    isNeedUpdate = true;
  }
  if (isNeedUpdate && updateActions.indexOf(action.type) !== -1) {
    store.dispatch(requestUpdateThumbnail());
    action.isNeedWaiting = true;
    next(action);
  } else {
    next(action);
  }
};

export default thumbnail;
