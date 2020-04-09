import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

function PlayerHaveLabels(props) {
  const { players } = props;
  return (
    <Grid columns={players.length} divided>
      <Grid.Row verticalAlign="bottom" textAlign="center">
        {players.map(player => (
          <Grid.Column key={player.id}>
            {player.name}
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}
PlayerHaveLabels.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayerHaveLabels;
