import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Button } from 'semantic-ui-react';

function TeamHeader(props) {
  const { id, name, code, players, onEditClick } = props;
  const teamUrl = `${window.location.protocol}//${window.location.host}/team/${code}`;
  return (
    <Grid verticalAlign="bottom">
      <Grid.Row>
        <Grid.Column width={6}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div>
              <h3>{name}</h3>
            </div>
            <div style={{ marginLeft: '0.3em' }}>
              <Button size="mini" onClick={onEditClick}>Edit</Button>
            </div>
          </div>
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
  onEditClick: PropTypes.func.isRequired,
};

export default TeamHeader;
