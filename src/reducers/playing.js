import { TOGGLE_PLAY, UPDATE_JOINED_IMAGE } from '@actions/const';

const initialState = {
  isPlaying: false,
  joinedImage: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY: {
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying
      });
    }
    case UPDATE_JOINED_IMAGE: {
      console.log(action.image);
      return Object.assign({}, state, {
        joinedImage: action.image
      });
    }
    default: {
      return state;
    }
  }
}
