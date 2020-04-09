import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

function TeamHeader(props) {
  const { id, name, code, players } = props;
  const teamUrl = `${window.location.protocol}//${window.location.host}/team/${code}`;
  return (
    <Grid verticalAlign="bottom">
      <Grid.Row>
        <Grid.Column width={6}>
          <h2>{name}</h2>
        </Grid.Column>
        <Grid.Column width={10} textAlign="right">
          <b>Secret URL:</b> <a href={teamUrl}>{teamUrl}</a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
TeamHeader.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TeamHeader;
