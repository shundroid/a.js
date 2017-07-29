import React from 'react';
import { shallow } from 'enzyme';
import FrameItem from 'components\FrameItem.js';

describe('<FrameItem />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<FrameItem />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "frameitem-component"', function () {
      expect(component.hasClass('frameitem-component')).to.equal(true);
    });
  });
});
