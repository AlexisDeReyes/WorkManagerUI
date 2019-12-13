import axios, { AxiosResponse } from "axios";
import { TeamTaskResponse } from "../Types/CompoundResources";
import { Task } from "../Types/Task";
import Team from "../Types/Team";

export default interface IApiService {
  PostTeam: (name: string) => Promise<AxiosResponse<Team>>;
  PostTask: (team: string, task: Task) => Promise<AxiosResponse<TeamTaskResponse>>;
  GetTeam: (team: string) => Promise<AxiosResponse<Team>>;
}
