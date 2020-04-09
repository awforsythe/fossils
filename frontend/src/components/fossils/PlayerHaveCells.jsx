import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

function PlayerHaveCells(props) {
  const { players } = props;
  return (
    <Grid columns={players.length} divided>
      <Grid.Row textAlign="center">
        {players.map(player => (
          <Grid.Column key={player.id}>
            {player.name[0].toUpperCase()}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}
PlayerHaveCells.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerHaveCells;
