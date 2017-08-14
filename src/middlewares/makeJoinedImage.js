import { TOGGLE_PLAY, UPDATE_THUMBNAIL, ADD_FRAME, REMOVE_FRAME, MOVE_FRAME } from '@actions/const';
import { updateJoinedImage } from '@actions';
import JoinedImage from '@utils/joinedImage';
import { waitAction } from '@middlewares/waitAction';

class Joiner {
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d');
  join(thumbnails, width, height) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return new Promise(resolve => {
      Promise.all(thumbnails.map(thumbnail => new Promise(_resolve => {
        if (thumbnail) {
          const image = new Image();
          image.onload = () => {
            _resolve(image);
          };
          image.src = thumbnail;
        } else {
          _resolve(new Image(width, height));
        }
      }))).then(images => {
        this.canvas.height = height;
        this.canvas.width = width * images.length;
        for (let index = 0; index < images.length; index++) {
          this.ctx.drawImage(images[index], width * index, 0);
        }

        this.canvas.toBlob(blob => {
          resolve(new JoinedImage(
            this.canvas.toDataURL(),
            blob,
            images.length,
            width,
            height
          ));
        });
      });
    });
  }
}
const joiner = new Joiner();
const needToUpdateActions = [UPDATE_THUMBNAIL, ADD_FRAME, REMOVE_FRAME, MOVE_FRAME];
let isNeedNewJoinedImage = false;

function join(store) {
  const thumbnails = store.getState().canvas.frames.map(frame => frame.thumbnail);
  const { width, height } = store.getState().canvas;
  joiner.join(thumbnails, width, height).then(joinedImage => {
    store.dispatch(updateJoinedImage(joinedImage));
  });
}

function waitForUpdateThumbnail(action) {
  return new Promise(resolve => {
    if (action.isUpdateThumbnail) {
      waitAction(UPDATE_THUMBNAIL).then(resolve);
    } else {
      resolve();
    }
  });
}

const makeJoinedImage = store => next => action => {
  next(action);
  if (needToUpdateActions.indexOf(action.type) !== -1) {
    isNeedNewJoinedImage = true;
  }
  if (action.type === TOGGLE_PLAY && store.getState().player.isPlaying) {
    if (isNeedNewJoinedImage) {
      isNeedNewJoinedImage = false;
      waitForUpdateThumbnail(action).then(() => {
        join(store);
      });
    }
  }
};

export default makeJoinedImage;
