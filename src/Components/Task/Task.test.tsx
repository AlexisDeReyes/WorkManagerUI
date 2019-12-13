import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';

import Task from './Task';
import { Task as TaskType } from '../../Types/Task';

describe('Task Component tests', () => {
  let task: TaskType;
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let snapShot: ReactTestRenderer;

  beforeAll(() => {
    task = new TaskType('test task', 'description', 3);
    component = <Task Task={task} />;
    wrapper = shallow(component);
    snapShot = create(component);
  });

  it('Should Render Task Component', () => {
    expect(snapShot.toJSON).toMatchSnapshot();
  });

  it('Should have blank ID', () => {
    expect(wrapper.find('li#id').html()).toEqual('<li id="id">Id: ...</li>');
  });

  it('Should not have blank ID', () => {
    task.id = 'abcdef';
    component = <Task Task={task} />;
    wrapper = shallow(component);
    expect(wrapper.find('li#id').html()).toEqual('<li id="id">Id: abcde...</li>');
  });
});
