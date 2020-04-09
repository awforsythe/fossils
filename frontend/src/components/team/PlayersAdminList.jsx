import React from 'react';
import PropTypes from 'prop-types';

import PlayersAdminListItem from './PlayersAdminListItem.jsx';

function PlayersAdminList(props) {
  const { players, teamCode, onClose } = props;
  return (
    <ul>
      {players.map(player => (
        <PlayersAdminListItem
          key={player.id}
          id={player.id}
          name={player.name}
          teamCode={teamCode}
        />
      ))}
    </ul>
  );
}
PlayersAdminList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamCode: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlayersAdminList;
