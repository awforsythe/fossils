import React from 'react';
import ReactDOM from 'react-dom';

import { FossilsProvider } from './contexts/FossilsContext.jsx';
import FossilTable from './components/fossils/FossilTable.jsx';

const App = () => (
  <FossilsProvider>
    <FossilTable />
  </FossilsProvider>
);

ReactDOM.render(<App />, document.body);
