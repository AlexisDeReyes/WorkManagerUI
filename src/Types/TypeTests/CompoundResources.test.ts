import { TeamTaskResponse } from '../CompoundResources';
import Team from '../Team';

import { v4 as uuid } from 'uuid';
import { Task } from '../Task';

it('Creates a Team Task', () => {
  const [teamName, taskName] = [uuid(), uuid()];
  const newTeamTask = new TeamTaskResponse(new Team(teamName), new Task(taskName));

  expect(newTeamTask.Task.name).toEqual(taskName);
  expect(newTeamTask.Team.name).toEqual(teamName);
});
