import DBItem from '../DBItem';
import PrioritizedList from '../PrioritizedList';
import { Task, TaskStatus } from '../Task';
import TaskHolder from '../TaskHolder';

import { v4 as uuid } from 'uuid';

it('Creates a new TaskHolder', () => {
  const newTaskHolder = new TaskHolder();

  expect(newTaskHolder).not.toBeUndefined();
  expect(newTaskHolder.id).toBeUndefined();
  expect(newTaskHolder.taskColumns).toEqual([]);
});

it('Creates a new Task on a TaskHolder', () => {
  const taskHolder = new TaskHolder();
  const newTask = new Task(uuid());
  taskHolder.AddTask(newTask);

  expect(taskHolder.taskColumns.length).toEqual(1);
  expect(taskHolder.taskColumns[0].tasks.length).toEqual(1);
  expect(taskHolder.taskColumns[0].name).toEqual(TaskStatus.New);
});

it('Removes Task from Task Holder', () => {
  const taskHolder = new TaskHolder();
  const newTask = new Task(uuid());
  taskHolder.AddTask(newTask);
  taskHolder.RemoveTask(newTask);

  expect(taskHolder.taskColumns[0].tasks).toEqual([]);
});

it('changes Task Status on Task Holder', () => {
  const taskHolder = new TaskHolder();
  const newTask = new Task(uuid());
  taskHolder.AddTask(newTask);
  taskHolder.ChangeTaskStatus(newTask, TaskStatus.Ready);

  const oldColumn = taskHolder.GetColumn(TaskStatus.New);
  const newColumn = taskHolder.GetColumn(TaskStatus.Ready);

  expect(oldColumn.tasks).toEqual([]);
  expect(newColumn.tasks.length).toEqual(1);
  expect(newColumn.GetTask(newTask.name)).toBeDefined();
});

it('Should create column where none exists', () => {
  const taskHolder = new TaskHolder();
  const newTask = new Task(uuid());
  taskHolder.AddTask(newTask);

  const numberOfColumns = taskHolder.taskColumns.length;

  taskHolder.GetColumn(TaskStatus.Done);

  expect(taskHolder.taskColumns.length).toEqual(numberOfColumns + 1);
});
