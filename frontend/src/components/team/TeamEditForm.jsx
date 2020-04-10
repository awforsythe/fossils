import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';

import { expectJson } from '../../util.jsx';

function TeamEditForm(props) {
  const { code, name } = props;
  const [newTeamName, setNewTeamName] = useState(name);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const canSubmit = !isSubmitting && newTeamName.length > 0 && newTeamName != name;

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    fetch(`/api/team/${code}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTeamName }),
    })
      .then(expectJson)
      .then(data => {
        setNewTeamName(data.team.name);
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
        <Form.Field>
          <label>Team Name</label>
          <input
            name="teamName"
            value={newTeamName}
            onChange={(event) => setNewTeamName(event.target.value)}
            placeholder="A name for the group of players you're collecting fossils with"
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={!canSubmit}>Rename Team</Button>
        </Form.Field>
      </Dimmer.Dimmable>
    </Form>
  );
}
TeamEditForm.propTypes = { 
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TeamEditForm;
