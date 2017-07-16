import { UNDO } from './const';

function action(parameter) {
  return { type: UNDO, parameter };
}

module.exports = action;
