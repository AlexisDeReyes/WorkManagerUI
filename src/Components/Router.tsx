import React from 'react';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Team from './Team/Team';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={App}/>
            <Route path="/team/:name" render={ props => (<Team teamName={props.match.params.name}/>)
            }/>
        </BrowserRouter>
    );
}

export default Router;