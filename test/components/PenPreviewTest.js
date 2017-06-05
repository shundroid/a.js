import React from 'react';
import { shallow } from 'enzyme';
import PenPreview from 'components\PenPreview.js';

describe('<PenPreview />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<PenPreview />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "penpreview-component"', function () {
      expect(component.hasClass('penpreview-component')).to.equal(true);
    });
  });
});
