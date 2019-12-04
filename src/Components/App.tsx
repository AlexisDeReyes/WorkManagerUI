import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import APIService from '../Services/ApiService';
import { Team } from '../Types/Team';

const App: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState("");

  const CreateNewTeam = () => {
    APIService.PostTeam(newTeamName).then((response: AxiosResponse<Team>) => {
      window.location.href = `http://localhost:3000/team/${newTeamName}`;
    }).catch((error: any) => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>Create a team</h1>
      <input type="text" value={newTeamName} onChange={event => setNewTeamName(event.target.value)}/>
      <button onClick={CreateNewTeam}>Create New Team</button>
    </div>
  );
}

export default App;
