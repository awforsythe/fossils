import React from 'react';
import PropTypes from 'prop-types';

function FossilTableRow(props) {
  const { pieceId, pieceName } = props;
  return (
    <tr>
      <td>{pieceId}</td>
      <td>{pieceName}</td>
    </tr>
  );
}
FossilTableRow.propTypes = {
  pieceId: PropTypes.number.isRequired,
  pieceName: PropTypes.string.isRequired,
};

export default FossilTableRow;
