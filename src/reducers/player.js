import { TOGGLE_PLAY, UPDATE_JOINED_IMAGE, UPDATE_DURATION, UPDATE_EASING, UPDATE_ANIMATION } from '@actions/const';
import JoinedImage from '@utils/joinedImage';

const initialState = {
  isPlaying: false,
  joinedImage: JoinedImage.getEmpty(),
  duration: 500,
  easing: 'linear',
  animation: null
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
    case UPDATE_EASING: {
      return Object.assign({}, state, {
        easing: action.easing
      });
    }
    case UPDATE_ANIMATION: {
      return Object.assign({}, state, {
        animation: action.animation
      });
    }
    default: {
      return state;
    }
  }
}
