import { CHANGE_LINE_WIDTH } from '@actions/const';

function action(parameter) {
  return { type: CHANGE_LINE_WIDTH, lineWidth: parameter };
}

module.exports = action;
