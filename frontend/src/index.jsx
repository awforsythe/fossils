import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

import { FossilsProvider } from './contexts/FossilsContext.jsx';
import FossilTable from './components/fossils/FossilTable.jsx';

const App = () => (
  <FossilsProvider>
    <Container className="main-container">
      <h1>Fossils</h1>
      <FossilTable />
    </Container>
  </FossilsProvider>
);

const div = document.createElement('div');
div.id = "main";
document.body.appendChild(div);
ReactDOM.render(<App />, div);
