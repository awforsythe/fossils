import React, { useContext, useState } from 'react';

import { Message, Loader } from 'semantic-ui-react';

import { TeamContext } from '../contexts/TeamContext.jsx';

import TeamHeader from '../components/team/TeamHeader.jsx';
import TeamEditDialog from '../components/team/TeamEditDialog.jsx';
import FossilTable from '../components/fossils/FossilTable.jsx';

const TeamPage = () => {
  const context = useContext(TeamContext);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
        onEditClick={() => setEditDialogOpen(true)}
      />
      <FossilTable
        players={context.team.players}
      />
      <TeamEditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
    </div>
  );
};

export default TeamPage;
