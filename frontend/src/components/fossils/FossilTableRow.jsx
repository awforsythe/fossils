import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

import PlayerHaveCells from './PlayerHaveCells.jsx';

function FossilTableRow(props) {
  const { pieceId, pieceName, players } = props;
  return (
    <Table.Row>
      <Table.Cell width={1} className="piece-id">{pieceId}</Table.Cell>
      <Table.Cell width={3} className="piece-name">{pieceName}</Table.Cell>
      <Table.Cell width={12}>
        <PlayerHaveCells pieceId={pieceId} players={players} />
      </Table.Cell>
    </Table.Row>
  );
}
FossilTableRow.propTypes = {
  pieceId: PropTypes.number.isRequired,
  pieceName: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FossilTableRow;
