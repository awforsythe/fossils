import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { FossilsProvider } from './contexts/FossilsContext.jsx';
import FossilTable from './components/fossils/FossilTable.jsx';

const App = () => (
  <FossilsProvider>
    <Container>
      <h1>Fossils</h1>
      <FossilTable />
    </Container>
  </FossilsProvider>
);

ReactDOM.render(<App />, document.body);
