import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';

import { expectJson } from '../../util.jsx';

function PlayerAddForm(props) {
  const { teamCode } = props;
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const canSubmit = !isSubmitting && name.length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    fetch(`/api/team/${teamCode}/player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
      .then(expectJson)
      .then(data => {
        console.log(data);
        setName('');
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="New player name"
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
              Add Player
            </Button>
          </div>
        </div>
      </Dimmer.Dimmable>
    </Form>
  );
}
PlayerAddForm.propTypes = {
  teamCode: PropTypes.string.isRequired,
};

export default PlayerAddForm;
