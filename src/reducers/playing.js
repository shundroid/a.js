import { TOGGLE_PLAY } from '@actions/const';

const initialState = {
  isPlaying: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY: {
      return Object.assign({}, state, {
        isPlaying: !state.isPlaying
      });
    }
    default: {
      return state;
    }
  }
}
