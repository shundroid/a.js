import { UNDO } from '@actions/const';

function action(parameter) {
  return { type: UNDO, parameter };
}

module.exports = action;
