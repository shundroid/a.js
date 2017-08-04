import { MOVE_FRAME } from '@actions/const';

function action(id, insertId) {
  return { type: MOVE_FRAME, id, insertId };
}

module.exports = action;
