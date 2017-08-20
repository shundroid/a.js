// { actionType: [Promise, ...], ... }
const callbacks = {};

export function waitAction(actionType) {
  return new Promise(resolve => {
    if (typeof callbacks[actionType] === 'undefined') {
      callbacks[actionType] = [];
    }
    callbacks[actionType].push(resolve);
  });
}
const middleware = () => next => action => {
  next(action);
  if (callbacks[action.type]) {
    for (const callback of callbacks[action.type]) {
      callback();
    }
    delete callbacks[action.type];
  }
};

export default middleware;
