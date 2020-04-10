import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

function PlayerHaveCells(props) {
  const { pieceId, players } = props;
  return (
    <Grid columns={players.length} divided>
      <Grid.Row textAlign="center">
        {players.map(player => (
          <Grid.Column key={player.id}>
            {player.pieces.includes(pieceId) ? player.name[0].toUpperCase() : '-'}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}
PlayerHaveCells.propTypes = {
  pieceId: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerHaveCells;
