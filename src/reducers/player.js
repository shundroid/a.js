import { TOGGLE_PLAY, UPDATE_JOINED_IMAGE } from '@actions/const';
import JoinedImage from '@utils/joinedImage';

const initialState = {
  isPlaying: false,
  joinedImage: JoinedImage.getEmpty()
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY: {
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying
      });
    }
    case UPDATE_JOINED_IMAGE: {
      return Object.assign({}, state, {
        joinedImage: action.image
      });
    }
    default: {
      return state;
    }
  }
}
