import React, { useState } from 'react';
import './App.css';
import { APIService } from '../Services/ApiService';

const App: React.FC = () => {
  const [newTeamName, setNewTeamName] = useState("");

  const CreateNewTeam = () => {
    APIService.PostTeam(newTeamName).then(response => {
      window.location.href = `http://localhost:3000/team/${newTeamName}`;
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <h1>Create a team</h1>
      <input type="text" value={newTeamName} onChange={event => setNewTeamName(event.target.value)}/>
      <button onClick={CreateNewTeam}>Create New Team</button>
    </div>
  );
}

export default App;
