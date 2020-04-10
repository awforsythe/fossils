import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Modal, Message, Loader, Tab, Divider } from 'semantic-ui-react';

import { TeamContext } from '../../contexts/TeamContext.jsx';

import TeamEditForm from './TeamEditForm.jsx';
import PlayersAdminList from './PlayersAdminList.jsx';
import PlayerAddForm from './PlayerAddForm.jsx';

function TeamEditDialog(props) {
  const context = useContext(TeamContext);
  const { open, onClose } = props;
  return (
    <Modal open={open} onClose={onClose} centered={false}>
      <Modal.Content>
        {context.error ? (
          <Message negative header="Error loading team" content={context.error} />
        ) : (
          !context.team ? (
            <Loader content="Loading team..." />
          ) : (
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={[
              { menuItem: 'Team',
                render: () => (
                  <div>
                    <h3>Edit Team</h3>
                    <TeamEditForm
                      code={context.team.code}
                      name={context.team.name}
                    />
                  </div>
                ),
              },
              { menuItem: 'Players',
                render: () => (
                  <div>
                    <h3>Edit Players</h3>
                    <PlayersAdminList
                      players={context.team.players}
                      teamCode={context.team.code}
                    />
                    <Divider />
                    <PlayerAddForm
                      teamCode={context.team.code}
                    />
                  </div>
                ),
              },
            ]} />
          )
        )}
      </Modal.Content>
    </Modal>
  );
}
TeamEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TeamEditDialog;
