import { UPDATE_THUMBNAIL } from '@actions/const';
import { updateJoinedImage } from '@actions';

class Joiner {
  canvas = document.createElement('canvas');
  ctx = this.canvas.getContext('2d');
  join(thumbnails) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    return new Promise(resolve => {
      Promise.all(thumbnails.map(thumbnail => new Promise(_resolve => {
        const image = new Image();
        image.onload = () => {
          _resolve(image);
        };
        image.src = thumbnail;
      }))).then(images => {
        this.canvas.height = images[0].height;
        this.canvas.width = images[0].width * images.length;
        for (let index = 0; index < images.length; index++) {
          this.ctx.drawImage(images[index], images[0].width * index, 0);
        }
        resolve(this.canvas.toDataURL());
      });
    });
  }
}
const joiner = new Joiner();

const makeJoinedImage = store => next => action => {
  next(action);
  switch (action.type) {
    case UPDATE_THUMBNAIL: {
      if (!store.getState().playing.isPlaying) {
        break;
      }
      const thumbnails = store.getState().canvas.frames.map(frame => frame.thumbnail);
      joiner.join(thumbnails).then(joinedImage => {
        store.dispatch(updateJoinedImage(joinedImage));
      });
      break;
    }
    default: {}
  }
};

export default makeJoinedImage;
