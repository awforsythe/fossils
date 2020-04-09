import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    fetch('/api/fossils')
    .then(response => response.json())
    .then(data => setMessage(`Got ${data.species.length} fossil species`))
    .catch(err => setMessage(`ERROR: ${err}`));
  })
  return <h1>{message}</h1>;
}

ReactDOM.render(<App />, document.body);
