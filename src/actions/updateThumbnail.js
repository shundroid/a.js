import { UPDATE_THUMBNAIL } from '@actions/const';

function action(index, thumbnail) {
  return { type: UPDATE_THUMBNAIL, index, thumbnail };
}

module.exports = action;
