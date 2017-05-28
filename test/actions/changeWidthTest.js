import action from 'actions/changeWidth';
import { CHANGE_WIDTH } from 'actions/const';

describe('changeWidth', () => {
  it('should create an action to change the width', () => {
    const width = 40;
    expect(action(width)).to.deep.equal({
      type: CHANGE_WIDTH,
      width
    });
  });
});