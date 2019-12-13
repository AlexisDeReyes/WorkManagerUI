import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';

import Router from './Router';

it('Renders without crashing', () => {
  const router = <Router />;
  const wrapper = shallow(router);
  const shot = create(router);

  expect(shot.toJSON).toMatchSnapshot();
});
