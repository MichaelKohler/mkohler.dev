import React from 'react';
import { shallow } from 'enzyme';

import Talks from '../src/Talks';

test('should correctly render Talks', () => {
  const component = shallow(<Talks />);
  expect(component).toMatchSnapshot();
});
