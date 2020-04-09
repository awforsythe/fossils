import React from 'react';

const FossilsContext = React.createContext();

class FossilsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      species: [],
    };
  }

  componentDidMount() {
    fetch('/api/fossils')
      .then(r => r.json())
      .then(({ species }) => this.setState({ species }))
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <FossilsContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </FossilsContext.Provider>
    );
  }
};

export { FossilsContext, FossilsProvider };
