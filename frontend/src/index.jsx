import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

import { FossilsProvider } from './contexts/FossilsContext.jsx';
import { TeamProvider } from './contexts/TeamContext.jsx';
import IndexPage from './pages/IndexPage.jsx';
import TeamPage from './pages/TeamPage.jsx';

const App = () => (
  <Container className="main-container">
    <h1>Fossils</h1>
    <FossilsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/team/:teamCode" render={({ match }) => (
            <TeamProvider code={match.params.teamCode}>
              <TeamPage code={match.params.teamCode} />
            </TeamProvider>
          )} />
          <Route render={({ location }) => (
            <h3>Invalid URL: {location.pathname}</h3>
          )} />
        </Switch>
      </Router>
    </FossilsProvider>
  </Container>
);

const div = document.createElement('div');
div.id = "main";
document.body.appendChild(div);
ReactDOM.render(<App />, div);
