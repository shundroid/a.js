import { UPDATE_THUMBNAIL } from '@actions/const';

function action(id, thumbnail) {
  return { type: UPDATE_THUMBNAIL, id, thumbnail };
}

module.exports = action;
