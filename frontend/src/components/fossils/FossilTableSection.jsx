import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

import PlayerHaveLabels from './PlayerHaveLabels.jsx';
import FossilTableRow from './FossilTableRow.jsx';

function FossilTableSection(props) {
  const { speciesId, speciesName, pieces, players } = props;
  return (
    <React.Fragment>
      <Table.Row className="species-row">
        <Table.Cell colSpan={2} className="species-name">{speciesName}</Table.Cell>
        <Table.Cell>
          <PlayerHaveLabels players={players} />
        </Table.Cell>
      </Table.Row>
      {pieces.map(piece => (
        <FossilTableRow
          key={piece.id}
          pieceId={piece.id}
          pieceName={piece.name}
          players={players}
        />
      ))}
    </React.Fragment>
  );
}
FossilTableSection.propTypes = {
  speciesId: PropTypes.number.isRequired,
  speciesName: PropTypes.string.isRequired,
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FossilTableSection;
