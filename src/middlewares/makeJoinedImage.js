const makeJoinedImage = store => next => action => {
  next(action);
};

export default makeJoinedImage;
