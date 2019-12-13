import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../App';
import Team from '../Team/Team';

const Routes: React.FC = () => {
  return (
    <div>
      <Route exact path='/' component={App} />
      <Route path='/team/:name' render={props => <Team teamName={props.match.params.name} />} />
    </div>
  );
};

export default Routes;
