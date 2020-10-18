import React from 'react';
import { shallow } from 'enzyme';

import Mozilla from '../src/Mozilla';

test('should correctly render Mozilla', () => {
  const component = shallow(<Mozilla />);
  expect(component).toMatchSnapshot();
});
