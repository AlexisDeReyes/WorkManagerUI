import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from '../App';
import Team from '../Team/Team';
import Routes from './Routes';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
