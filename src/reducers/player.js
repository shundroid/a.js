import { TOGGLE_PLAY, UPDATE_JOINED_IMAGE, UPDATE_DURATION } from '@actions/const';
import JoinedImage from '@utils/joinedImage';

const initialState = {
  isPlaying: false,
  joinedImage: JoinedImage.getEmpty(),
  duration: 0.5
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
    case UPDATE_DURATION: {
      return Object.assign({}, state, {
        duration: action.duration
      });
    }
    default: {
      return state;
    }
  }
}
