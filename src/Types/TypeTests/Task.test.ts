import { Task } from '../Task';

import { v4 as uuid } from 'uuid';

describe('Task Tests', () => {
  let name: string;
  let newTask: Task;

  beforeEach(() => {
    name = uuid();
  });

  it('Creates a new Task with name', () => {
    newTask = new Task(name);

    expect(newTask.name).toEqual(name);
    expect(newTask.priority).toEqual(-1);
    expect(newTask.description).toBeUndefined();
    expect(newTask.effort).toBeUndefined();
  });

  it('Creates a new Task with name and description', () => {
    const description = uuid();

    newTask = new Task(name, description);

    expect(newTask.name).toEqual(name);
    expect(newTask.description).toEqual(description);
    expect(newTask.effort).toBeUndefined();
  });

  it('Creates a new Task with name, description, and effort', () => {
    const [description, effort] = [uuid(), 5];

    newTask = new Task(name, description, effort);

    expect(newTask.name).toEqual(name);
    expect(newTask.description).toEqual(description);
    expect(newTask.effort).toEqual(5);
  });
});
