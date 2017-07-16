import React from 'react';
import { shallow } from 'enzyme';
import UndoButton from 'components\UndoButton.js';

describe('<UndoButton />', function () {

  let component;
  beforeEach(function () {
    component = shallow(<UndoButton />);
  });

  describe('when rendering the component', function () {

    it('should have a className of "undobutton-component"', function () {
      expect(component.hasClass('undobutton-component')).to.equal(true);
    });
  });
});
