import { CHANGE_COLOR } from './const';

function action(parameter) {
  return { type: CHANGE_COLOR, parameter };
}

module.exports = action;
