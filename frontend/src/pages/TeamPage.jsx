import React, { useContext } from 'react';

import { Message, Loader } from 'semantic-ui-react';

import { TeamContext } from '../contexts/TeamContext.jsx';

import TeamHeader from '../components/team/TeamHeader.jsx';
import FossilTable from '../components/fossils/FossilTable.jsx';

const TeamPage = () => {
  const context = useContext(TeamContext);
  if (context.error) {
    return (
      <Message negative>
        <Message.Header>Error loading team</Message.Header>
        <p>{context.error}</p>
        <p><a href="/">&larr; Back to main page</a></p>
      </Message>
    );
  }
  if (!context.team) {
    return <Loader active content="Loading team..." />
  }
  return (
    <div>
      <TeamHeader
        id={context.team.id}
        name={context.team.name}
        code={context.team.code}
        players={context.team.players}
      />
      <FossilTable
        players={context.team.players}
      />
    </div>
  );
};

export default TeamPage;
