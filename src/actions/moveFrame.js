import { MOVE_FRAME } from '@actions/const';

function action(index, insertIndex) {
  return { type: MOVE_FRAME, index, insertIndex };
}

module.exports = action;
