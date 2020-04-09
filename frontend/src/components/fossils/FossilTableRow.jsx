import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

function FossilTableRow(props) {
  const { pieceId, pieceName } = props;
  return (
    <Table.Row>
      <Table.Cell width={1} style={{ color: '#aaa' }}>{pieceId}</Table.Cell>
      <Table.Cell width={15}>{pieceName}</Table.Cell>
    </Table.Row>
  );
}
FossilTableRow.propTypes = {
  pieceId: PropTypes.number.isRequired,
  pieceName: PropTypes.string.isRequired,
};

export default FossilTableRow;
