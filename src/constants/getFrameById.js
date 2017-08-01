export default function getFrameById(frames, id) {
  for (let frame of frames) {
    if (frame.originalId === id) {
      return frame;
    }
  }
  return null;
}
