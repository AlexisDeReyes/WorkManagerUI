import IQueryable from "./IQueryable";
import TaskHolder from "./TaskHolder";
import { AxiosResponse } from "axios";

export class Team extends TaskHolder implements IQueryable {
    public name: string;
    
    static GetFromApiResponse(response: AxiosResponse<Team>): Team {
        let newTeam = new Team(response.data.name);
        newTeam.taskColumns = response.data.taskColumns;
        newTeam.id = response.data.id;
        
        newTeam.SortColumns();

        return newTeam;
    }
    
    constructor(name: string) {
        super();
        this.name = name;
    }

    public Query(q: string) {
        return this.name.toLowerCase().indexOf(q) !== -1;
    }
}
