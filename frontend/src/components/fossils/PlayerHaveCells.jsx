import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import PlayerHaveCell from './PlayerHaveCell.jsx';

function getColor(i, n) {
  const allColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'];
  const mediumTeamSizeColors = ['red', 'yellow', 'green', 'blue', 'purple'];
  const smallTeamSizeColors = ['red', 'green', 'blue'];
  if (i < n && n <= smallTeamSizeColors.length) {
    return smallTeamSizeColors[i];
  }
  if (i < n && n <= mediumTeamSizeColors.length) {
    return mediumTeamSizeColors[i];
  }
  return allColors[i % allColors.length];
}

function PlayerHaveCells(props) {
  const { pieceId, players, teamCode } = props;
  return (
    <Grid columns={players.length} divided>
      <Grid.Row textAlign="center">
        {players.map((player, i) => (
          <Grid.Column key={player.id}>
            <PlayerHaveCell
              active={player.pieces.includes(pieceId)}
              color={getColor(i, players.length)}
              teamCode={teamCode}
              playerId={player.id}
              playerName={player.name}
              pieceId={pieceId}
            />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}
PlayerHaveCells.propTypes = {
  pieceId: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  teamCode: PropTypes.string.isRequired,
};

export default PlayerHaveCells;
