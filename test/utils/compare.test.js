import { compare, revert } from 'utils/compare';

const testDatas = [
  [[0], [0, 1]],
  [[0, 1, 2], [0]],
  [[0, 2, 3], [0, 1, 3]],
  [[0, 1, 2, 3, 4], [0, 2, 4]],
  [[0, 1, 2, 3], [3, 2, 1, 0]],
  [[1, 2, 3], [2, 3, 1]],
  [[0, 1, 2], [1, 2, 0]],
  [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15], [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]
];

describe('compare', () => {
  it('should restore compare datas', () => {
    for (let datas of testDatas) {
      const diff = compare(datas[0], datas[1]);
      const reverted = revert(datas[1], diff);
      assert.deepEqual(datas[0], reverted);
    }
  });
});
