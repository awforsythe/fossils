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
    this.socket = null;
  }

  handleSocketEvent(event) {
    const { team } = this.state;
    if (event.table === 'team') {
      if (event.op === 'update') {
        this.setState({ team: { ...team, name: event.row.name } });
      }
    } else if (event.table === 'player') {
      const i = team.players.findIndex(x => x.id === event.row.id);
      const player = { id: event.row.id, name: event.row.name, pieces: i >= 0 ? team.players[i].pieces : [] };
      if (event.op === 'insert' && i < 0) {
        const players = team.players.concat([player]);
        this.setState({ team: { ...team, players } });
      } else if (event.op === 'update' && i >= 0) {
        const players = team.players.slice(0, i).concat([player]).concat(team.players.slice(i + 1));
        this.setState({ team: { ...team, players } });
      } else if (event.op === 'delete' && i >= 0) {
        const players = team.players.slice(0, i).concat(team.players.slice(i + 1));
        this.setState({ team: { ...team, players } });
      }
    } else if (event.table === 'have' && (event.op === 'insert' || event.op === 'delete')) {
      const i = team.players.findIndex(x => x.id === event.row.player_id);
      if (i >= 0) {
        const pieces = event.op === 'insert' ? (
          [...team.players[i].pieces].concat([event.row.piece_id]).sort((a, b) => a - b)
        ) : (
          team.players[i].pieces.filter(x => x !== event.row.piece_id).sort((a, b) => a - b)
        );
        const player = { ...team.players[i], pieces };
        const players = team.players.slice(0, i).concat([player]).concat(team.players.slice(i + 1));
        this.setState({ team: { ...team, players } });
      }
    }
  };

  componentDidMount() {
    this.fetchTeam();
    this.initSocket();
  }

  componentWillUnmount() {
    this.socket.close(1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.setState({ team: null });
      this.fetchTeam();
      this.initSocket();
    }
  }

  fetchTeam() {
    fetch(`/api/team/${this.props.code}`)
      .then(expectJson)
      .then(team => this.setState({ error: null, team }))
      .catch(err => this.setState({ error: err.message }));
  }

  initSocket() {
    if (this.socket) {
      this.socket.close(1000);
    }
    this.socket = new WebSocket(`ws://${window.location.host}/ws/team/${this.props.code}`);
    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      this.handleSocketEvent(payload);
    };
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
