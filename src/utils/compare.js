export function compare(prevItems, nextItems) {
  const addedItems = [];
  const removedItems = [];

  let nextIndex = 0;
  let prevIndex = 0;
  while (nextIndex < nextItems.length || prevIndex < prevItems.length) {
    if (nextIndex >= nextItems.length) {
      removedItems.push({ pos: prevIndex, item: prevItems[prevIndex] });
      prevIndex++;
      continue;
    }
    if (nextItems[nextIndex] === prevItems[prevIndex]) {
      nextIndex++;
      prevIndex++;
      continue;
    }
    let prevPosition;
    // eslint-disable-next-line no-cond-assign
    while ((prevPosition = prevItems.indexOf(nextItems[nextIndex], prevIndex)) === -1) {
      if (nextIndex >= nextItems.length) break;
      addedItems.push({ pos: nextIndex, item: nextItems[nextIndex] });
      nextIndex++;
      prevPosition = prevItems.indexOf(nextItems[nextIndex], prevIndex);
    }
    while (prevIndex < prevPosition) {
      removedItems.push({ pos: prevIndex, item: prevItems[prevIndex] });
      prevIndex++;
    }
  }
  return { added: addedItems, removed: removedItems };
}

export function revert(items, diff) {
  const copiedItems = items.slice(0);
  for (let i = 0; i < diff.added.length; i++) {
    copiedItems.splice(diff.added[i].pos - i, 1);
  }
  for (const removed of diff.removed) {
    copiedItems.splice(removed.pos, 0, removed.item);
  }
  return copiedItems;
}
