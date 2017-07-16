import { ADD_LINE, UNDO } from '../actions/const';
import { removeLine } from '../actions';


const historyMiddleware = store => next => action => {
  if (action.type === UNDO) {
    const { history, currentPosition } =
      store.getState().history;
    const historyItem = history[currentPosition - 1];
    next(action);
    switch (historyItem.type) {
      case ADD_LINE: {
        store.dispatch(removeLine(currentPosition - 1));
        break;
      }
    }
  } else {
    next(action);
  }
};

export default historyMiddleware;
