import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import PlayerHaveCell from './PlayerHaveCell.jsx';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink'];

function PlayerHaveCells(props) {
  const { pieceId, players, teamCode } = props;
  return (
    <Grid columns={players.length} divided>
      <Grid.Row textAlign="center">
        {players.map((player, i) => (
          <Grid.Column key={player.id}>
            <PlayerHaveCell
              active={player.pieces.includes(pieceId)}
              color={colors[i % colors.length]}
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
