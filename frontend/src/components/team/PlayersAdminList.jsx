import React from 'react';
import PropTypes from 'prop-types';

import PlayersAdminListItem from './PlayersAdminListItem.jsx';

function PlayersAdminList(props) {
  const { players, teamCode, onClose } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {players.map(player => (
        <PlayersAdminListItem
          key={player.id}
          id={player.id}
          name={player.name}
          teamCode={teamCode}
        />
      ))}
    </div>
  );
}
PlayersAdminList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamCode: PropTypes.string.isRequired,
};

export default PlayersAdminList;
