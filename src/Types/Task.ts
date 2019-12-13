import DBItem from './DBItem';
import TaskHolder from './TaskHolder';

export enum TaskStatus {
  New = 'New',
  Ready = 'Ready',
  InProgress = 'In Progress',
  Done = 'Done'
}

export enum TaskStatusAsNumber {
  New = 0,
  Ready = 1,
  InProgress = 2,
  Done = 3
}

export class Task extends DBItem {
  public name: string;
  public priority: number;
  public description: string | undefined;
  public effort: number | undefined;
  public status: TaskStatus;

  constructor(
    name: string,
    description: string | undefined = undefined,
    effort: number | undefined = undefined
  ) {
    super();
    this.name = name;
    this.description = description;
    this.effort = effort;
    this.priority = -1;
    this.status = TaskStatus.New;
  }
}
