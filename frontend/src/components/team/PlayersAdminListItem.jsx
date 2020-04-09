import React from 'react';
import PropTypes from 'prop-types';

function PlayersAdminListItem(props) {
  const { id, name, teamCode } = props;
  return (
    <li>{name} ({id})</li>
  );
}
PlayersAdminListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  teamCode: PropTypes.string.isRequired,
};

export default PlayersAdminListItem;
