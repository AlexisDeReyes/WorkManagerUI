import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Enzyme, { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import { ReactTestRenderer, create } from 'react-test-renderer';
import { v4 as uuid } from 'uuid';
import { AxiosResponse } from 'axios';
import { resolve } from 'url';

import Team from '../../Types/Team';
import { default as TeamComponent, teamProp, teamState } from './Team';
import ApiService from '../../Services/ApiService';
import { ServiceProps } from '../ServiceComponent/ServiceComponent';
import { Task, TaskStatus } from '../../Types/Task';
import { TeamTaskResponse } from '../../Types/CompoundResources';

type mockedService = jest.Mocked<ApiService>;

let someWrapper = shallow<TeamComponent>(<TeamComponent teamName={uuid()} />);

type ShallowTeamComponent = typeof someWrapper;

const GetMockTeamResolution = (team: Team) => {
  return jest.fn((teamName: string) => {
    const response: AxiosResponse<Team> = {
      status: 200,
      statusText: 'OK',
      data: team ? team : new Team(teamName),
      headers: [],
      config: {}
    };

    return Promise.resolve(response);
  });
};

const GetMockTeamTaskResolution = (team: Team, actualTask: Task) => {
  return jest.fn((teamName: string, task: Task) => {
    const response: AxiosResponse<TeamTaskResponse> = {
      status: 200,
      statusText: 'OK',
      data: {
        Team: team ? team : new Team(teamName),
        Task: actualTask
      },
      headers: [],
      config: {}
    };

    return Promise.resolve(response);
  });
};

describe('Team Component Tests', () => {
  let teamName = uuid();
  let component: JSX.Element;
  let wrapper: ShallowTeamComponent;
  let snapShot: ReactTestRenderer;

  const flushPromises = () => {
    return new Promise(resolve => setImmediate(resolve));
  };

  const createWrapperAndSnapshot = async () => {
    wrapper = shallow<TeamComponent>(component);
    snapShot = create(component);
    await flushPromises();
  };

  const setupBasicTest = () => {
    teamName = uuid();
    component = <TeamComponent teamName={teamName} />;
    createWrapperAndSnapshot();
  };

  it('Should Render without crashing', () => {
    setupBasicTest();

    // props are set
    expect(wrapper.instance().props.teamName).toEqual(teamName);

    // No columns are displayed when none exist
    const columns = wrapper.find('#taskColumns');
    expect(columns.text()).toEqual('');

    // Matching snapshot
    expect(snapShot.toJSON).toMatchSnapshot();
    expect(wrapper.instance().state.ColumnWidthMd).toEqual(12);
  });

  it('should update name, description, effort states', () => {
    setupBasicTest();
    const [newName, newDesc, newEffort] = [uuid(), uuid(), 3];

    const taskName = wrapper.find('input#taskName');
    taskName.simulate('change', { target: { value: newName } });
    expect(wrapper.instance().state.newTaskName).toEqual(newName);

    const desc = wrapper.find('input#description');
    desc.simulate('change', { target: { value: newDesc } });
    expect(wrapper.instance().state.newTaskDescription).toEqual(newDesc);

    const effort = wrapper.find('input#effort');
    effort.simulate('change', { target: { value: newEffort } });
    expect(wrapper.instance().state.newTaskEffort).toEqual(newEffort);
  });

  it('should create columns', async () => {
    let mockedWebService = new ApiService() as mockedService;

    let team = new Team(teamName);
    const basicTeam = new Team(teamName);
    team.AddTask(new Task(uuid(), uuid(), 1));
    team.AddTask(new Task(uuid(), uuid(), 4));

    const specialTask = new Task(uuid(), uuid(), 2);
    basicTeam.AddTask(specialTask);
    team.AddTask(specialTask);
    team.ChangeTaskStatus(specialTask, TaskStatus.InProgress);

    mockedWebService.PostTask = GetMockTeamTaskResolution(team, specialTask);
    mockedWebService.GetTeam = GetMockTeamResolution(basicTeam);

    component = <TeamComponent webService={mockedWebService} teamName={teamName} />;
    await createWrapperAndSnapshot();

    let basicState = wrapper.instance().state;
    expect(basicState.ColumnWidthMd).toEqual(12);
    expect(basicState.ColumnWidthSm).toEqual(12);
    expect(basicState.ColumnWidthXs).toEqual(12);

    wrapper.find('button').simulate('click');
    await flushPromises();

    await setTimeout(() => {
      const columnsHtml = wrapper.find('div#taskColumns');
      const modifiedState = wrapper.instance().state;
      expect(modifiedState.TeamColumns.length).toEqual(2);
      expect(columnsHtml.children.length).toEqual(2);
      expect(modifiedState.ColumnWidthMd).toEqual(6);
      expect(modifiedState.ColumnWidthSm).toEqual(12);
      expect(modifiedState.ColumnWidthXs).toEqual(12);
    }, 1000);
  });
});
