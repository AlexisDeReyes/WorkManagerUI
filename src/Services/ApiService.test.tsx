import ApiService from './ApiService';
import { v4 as uuid } from 'uuid';
import { Task } from '../Types/Task';
import { Team } from '../Types/Team';

it('creates a team', () => {
  const teamName = uuid();

  return ApiService.PostTeam(teamName).then(response => {
    expect(response.status).toEqual(200); 
    expect(response.data as Team).not.toBeNull();
    expect(response.data.name).toEqual(teamName);
    expect(response.data.id).not.toBeNull();
  }).catch(error => {
      expect(error).toBeNull();
  });
});

it('creates a task', () => {
    const teamName = uuid();
  
    return ApiService.PostTeam(teamName).then(response => {
        const taskName = uuid();
        return ApiService.PostTask(teamName, new Task(taskName)).then(response => {
            expect(response.status).toEqual(200);
            expect(response.data as Task).not.toBeNull();
            expect(response.data.name).toEqual(taskName);
            expect(response.data.id).not.toBeUndefined();
        }).catch(error => expect(error).toBeNull());
    }).catch(error => {
        expect(error).toBeNull();
    });
});

it('retrieves a team', () => {
  const teamName = uuid();

  return ApiService.PostTeam(teamName).then(response => {
      return ApiService.GetTeam(teamName)
        .then(response => expect(response.data as Team).not.toBeNull())
        .catch(error => expect(error).toBeNull());
  }).catch(error => {
      expect(error).toBeNull();
  });
});
