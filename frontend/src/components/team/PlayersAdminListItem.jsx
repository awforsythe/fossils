import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';

import { expectJson } from '../../util.jsx';

function PlayersAdminListItem(props) {
  const { id, name, teamCode } = props;
  const [newName, setNewName] = useState(name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const canSubmit = !isSubmitting && newName.length > 0 && newName !== name;

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    fetch(`/api/team/${teamCode}/player/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })
      .then(expectJson)
      .then(data => {
        setNewName(data.player.name);
        setIsSubmitting(false);
      })
      .catch(err => setSubmitError(err.message));
  }

  if (submitError) {
    return <Message negative header="Failed to rename team" content={submitError} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Dimmer.Dimmable dimmed={isSubmitting}>
        <Dimmer inverted active={isSubmitting}>
          <Loader />
        </Dimmer>
        <div style={{ display: 'flex', marginBottom: 5 }}>
          <div style={{ flexGrow: 1, marginRight: 5 }}>
            <Form.Field>
              <input
                type="text"
                name="name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Player name"
                autoComplete="off"
              />
            </Form.Field>
          </div>
          <div>
            <Button
              fluid
              type="submit"
              disabled={!canSubmit}
            >
              Rename
            </Button>
          </div>
        </div>
      </Dimmer.Dimmable>
    </Form>
  );
}
PlayersAdminListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  teamCode: PropTypes.string.isRequired,
};

export default PlayersAdminListItem;
