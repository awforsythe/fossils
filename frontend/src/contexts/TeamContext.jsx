import React from 'react';
import PropTypes from 'prop-types';

import { expectJson } from '../util.jsx';

const TeamContext = React.createContext();

class TeamProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      team: null,
    };
  }

  componentDidMount() {
    this.fetchTeam();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({ team: null });
      this.fetchTeam();
    }
  }

  fetchTeam() {
    fetch(`/api/team/${this.props.code}`)
      .then(expectJson)
      .then(team => this.setState({ error: null, team }))
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    return (
      <TeamContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </TeamContext.Provider>
    );
  }
};
TeamProvider.propTypes = {
  code: PropTypes.string.isRequired,
};

export { TeamContext, TeamProvider };
