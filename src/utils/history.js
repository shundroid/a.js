import { compare } from '@utils/compare';
import { getFrameById } from '@utils/frame';

export class ChangedFrame {
  constructor(originalId, linesDiff) {
    this.originalId = originalId;
    this.linesDiff = linesDiff
  }
}
export default class History {
  constructor(currentFrameIndex, framesDiff = { added: [], removed: [] }, changedFrames = []) {
    this.currentFrameIndex = currentFrameIndex;
    this.framesDiff = framesDiff;
    this.changedFrames = changedFrames;
  }
  static compare(frameIndex, prevFrames, nextFrames) {
    const prevIds = prevFrames.map(frame => frame.originalId);
    const nextIds = nextFrames.map(frame => frame.originalId);
    const diff = compare(prevIds, nextIds);
    const addedIds = diff.added.map(added => added.item);
    const changedFrames = nextIds.map((id, index) => {
      if (addedIds.indexOf(id) !== -1) {
        return null;
      }
      const prevFrame = getFrameById(prevFrames, id);
      if (prevFrame === null) {
        // throw
        return null;
      }
      const nextFrame = nextFrames[index];
      if (prevFrame.lines.length === nextFrame.lines.length) {
        return null;
      }
      const linesDiff = compare(prevFrame.lines, nextFrame.lines);
      return new ChangedFrame(id, linesDiff);
    }).filter(frame => frame !== null);
    const addedFrames = diff.added.map(added => {
      return {
        pos: added.pos,
        item: getFrameById(nextFrames, added.item)
      };
    });
    const removedFrames = diff.removed.map(removed => {
      return {
        pos: removed.pos,
        item: getFrameById(prevFrames, removed.item)
      };
    });
    return new History(frameIndex, {
      added: addedFrames,
      removed: removedFrames
    }, changedFrames);
  }
}
