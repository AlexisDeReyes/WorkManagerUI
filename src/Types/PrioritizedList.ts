import { Task } from './Task';

export default class PrioritizedList {
  public name: string;
  public tasks: Task[];
  constructor(name: string) {
    this.name = name;
    this.tasks = [];
  }

  public GetTask(identifier: string) {
    return this.tasks.find(task => task.name === identifier || task.id === identifier);
  }

  public AddTask(newTask: Task): Task {
    this.tasks.unshift(newTask);
    return newTask;
  }

  public RemoveTask(taskToRemove: Task): Task {
    this.tasks = this.tasks.filter(
      task => task.name !== taskToRemove.name && task.id !== taskToRemove.id
    );
    return taskToRemove;
  }
}
