import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Form, Button, Message } from 'semantic-ui-react';

import { expectJson } from '../../util.jsx';

function TeamCreateForm() {
  const [teamName, setTeamName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [submitError, setSubmitError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const canSubmit = teamName.length > 0 && playerName.length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, playerName }),
    })
      .then(expectJson)
      .then(data => setRedirectUrl(`/team/${data.team.code}`))
      .catch(err => setSubmitError(err.message));
  }

  if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {submitError && (
        <Message negative>
          <Message.Header>Failed to create new team</Message.Header>
          <p>{submitError}</p>
        </Message>
      )}
      <Form.Field width={8}>
        <label>Team Name</label>
        <input
          name="teamName"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          placeholder="A name for the group of players you're collecting fossils with"
          autoComplete="off"
        />
      </Form.Field>
      <Form.Field width={8}>
        <label>Player Name</label>
        <input
          name="playerName"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          placeholder="Your name: you're the founding team member!"
          autoComplete="off"
        />
      </Form.Field>
      <Button type="submit" disabled={!canSubmit}>Create New Team</Button>
    </Form>
  );
}

export default TeamCreateForm;
