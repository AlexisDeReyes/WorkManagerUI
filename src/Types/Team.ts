import { AxiosResponse } from 'axios';
import TaskHolder from './TaskHolder';

export default class Team extends TaskHolder {
  public static GetFromApiResponse(dtoTeam: Team): Team {
    const newTeam = new Team(dtoTeam.name);
    newTeam.taskColumns = dtoTeam.taskColumns;
    newTeam.id = dtoTeam.id;

    return newTeam;
  }
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
