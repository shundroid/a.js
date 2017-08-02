import { REMOVE_FRAME } from '@actions/const';

function action(index) {
  return { type: REMOVE_FRAME, index };
}

module.exports = action;
