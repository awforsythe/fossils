import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    fetch('/api')
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(err => setMessage(`ERROR: ${err}`));
  })
  return <h1>{message}</h1>;
}

ReactDOM.render(<App />, document.body);
