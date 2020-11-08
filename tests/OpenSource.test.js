import React from 'react';
import { shallow } from 'enzyme';

import OpenSource from '../src/OpenSource';

test('should correctly render OpenSource', () => {
  const component = shallow(<OpenSource />);
  expect(component).toMatchSnapshot();
});
