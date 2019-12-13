import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';

import TaskColumn from './TaskColumn';
import { Task as TaskType, Task } from '../../Types/Task';
import PrioritizedList from '../../Types/PrioritizedList';

const listName = 'New';

describe('Task Column Component tests', () => {
  let list: PrioritizedList;
  let component: JSX.Element;
  let wrapper: ShallowWrapper;
  let snapShot: ReactTestRenderer;

  const setupTest = () => {
    component = <TaskColumn List={list} key={listName} />;
    wrapper = shallow(component);
    snapShot = create(component);
  };

  beforeAll(() => {
    list = new PrioritizedList(listName);
  });

  it('Should Render Task Component with no tasks', () => {
    setupTest();

    expect(wrapper.find('h2').html()).toContain(listName);
    expect(snapShot.toJSON).toMatchSnapshot();
    expect(wrapper.find(`div`)).toEqual({});
  });

  it('Should Render Task Component with tasks', () => {
    const task = new Task('test');
    task.id = 'abcde';
    list.AddTask(task);
    setupTest();

    const foundTask = wrapper.find(`div`);

    expect(foundTask).toBeDefined();
    expect(foundTask.html()).toContain(task.id);
  });

  it('Should Render Task Component with task with no id', () => {
    const task = new Task('test');
    list.AddTask(task);
    setupTest();

    const foundTask = wrapper.find(`div`);

    expect(foundTask).toBeDefined();
    expect(foundTask.html()).toContain('Id: ...');
  });
});
