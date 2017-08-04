import { CHANGE_CURRENT_FRAME } from '@actions/const';

function action(id) {
  return { type: CHANGE_CURRENT_FRAME, id };
}

module.exports = action;
