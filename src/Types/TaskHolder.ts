import DBItem from './DBItem';
import PrioritizedList from './PrioritizedList';
import { Task, TaskStatus } from './Task';

export default class TaskHolder extends DBItem {
  public taskColumns: PrioritizedList[];
  constructor() {
    super();
    this.taskColumns = [];
  }

  public GetColumn(status: TaskStatus) {
    const existingColumn = this.taskColumns.find(c => c.name === status);
    if (existingColumn) {
      return existingColumn;
    } else {
      const newColumn = new PrioritizedList(status);
      this.taskColumns.push(newColumn);
      return newColumn;
    }
  }

  public AddTask(newTask: Task) {
    this.GetColumn(TaskStatus.New).AddTask(newTask);
    return newTask;
  }

  public RemoveTask(task: Task) {
    this.GetColumn(task.status).RemoveTask(task);
    return task;
  }

  public ChangeTaskStatus(task: Task, newStatus: TaskStatus) {
    this.GetColumn(task.status).RemoveTask(task);
    this.GetColumn(newStatus).AddTask(task);
    task.status = newStatus;
  }
}
