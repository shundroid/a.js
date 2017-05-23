import { CHANGE_WIDTH } from './const';

function action(parameter) {
  return { type: CHANGE_WIDTH, width: parameter };
}

module.exports = action;
