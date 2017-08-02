import { CHANGE_CURRENT_FRAME } from '@actions/const';

function action(index) {
  return { type: CHANGE_CURRENT_FRAME, index };
}

module.exports = action;
