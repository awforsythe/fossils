import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

import FossilTableRow from './FossilTableRow.jsx';

function FossilTableSection(props) {
  const { speciesId, speciesName, pieces } = props;
  return (
    <React.Fragment>
      <Table.Row className="species-row">
        <Table.Cell colSpan={2}>{speciesName}</Table.Cell>
      </Table.Row>
      {pieces.map(piece => (
        <FossilTableRow
          key={piece.id}
          pieceId={piece.id}
          pieceName={piece.name}
        />
      ))}
    </React.Fragment>
  );
}
FossilTableSection.propTypes = {
  speciesId: PropTypes.number.isRequired,
  speciesName: PropTypes.string.isRequired,
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FossilTableSection;
