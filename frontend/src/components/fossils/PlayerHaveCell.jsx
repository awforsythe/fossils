import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Label, Loader } from 'semantic-ui-react';

import { expect204 } from '../../util.jsx';

function PlayerHaveCell(props) {
  const { active, color, teamCode, playerId, playerName, pieceId } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClick() {
    setIsSubmitting(true);
    const verb = active ? 'lose' : 'have';
    fetch(`/api/team/${teamCode}/player/${playerId}/${verb}/${pieceId}`, { method: 'POST' })
    .then(expect204)
    .then(() => setIsSubmitting(false))
    .catch(err => {
      console.log(err);
      setIsSubmitting(false);
    });
  }

  if (isSubmitting) {
    return (
      <div className="have-cell have-cell-submitting">
        <Loader size="mini" active />
      </div>
    );
  }
  return (
    <div className="have-cell" onClick={handleClick}>
      {active ? (
        <Label circular color={color} className="have-cell-label" onClick={handleClick}>
          {playerName[0].toUpperCase()}
        </Label>
      ) : '-'}
    </div>
  );
}
PlayerHaveCell.propTypes = {
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  teamCode: PropTypes.string.isRequired,
  playerId: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  pieceId: PropTypes.number.isRequired,
};

export default PlayerHaveCell;
