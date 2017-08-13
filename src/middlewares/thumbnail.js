import {
  ADD_LINE, CLEAR_CANVAS, UNDO,
  CHANGE_CURRENT_FRAME, TOGGLE_PLAY,
  UPDATE_THUMBNAIL
} from '@actions/const';
import { requestUpdateThumbnail } from '@actions';

const needToUpdateActions = [ADD_LINE, CLEAR_CANVAS, UNDO];
const updateActions = [CHANGE_CURRENT_FRAME, TOGGLE_PLAY];

let isNeedToUpdate = false;

const thumbnail = store => next => action => {
  if (action.type === UPDATE_THUMBNAIL) {
    isNeedToUpdate = false;
  }
  if (needToUpdateActions.indexOf(action.type) !== -1) {
    isNeedToUpdate = true;
  }
  if (isNeedToUpdate && updateActions.indexOf(action.type) !== -1) {
    store.dispatch(requestUpdateThumbnail());
    action.isNeedToWait = true;
    next(action);
  } else {
    next(action);
  }
};

export default thumbnail;
