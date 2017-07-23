import { REMOVE_FRAME } from './const';

function action(index) {
  return { type: REMOVE_FRAME, index };
}

module.exports = action;
