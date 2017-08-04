import { REMOVE_FRAME } from '@actions/const';

function action(id) {
  return { type: REMOVE_FRAME, id };
}

module.exports = action;
