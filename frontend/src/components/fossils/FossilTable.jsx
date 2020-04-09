import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Table, Message, Loader } from 'semantic-ui-react';


import { FossilsContext } from '../../contexts/FossilsContext.jsx';

import FossilTableSection from './FossilTableSection.jsx';

function FossilTable(props) {
  const context = useContext(FossilsContext);
  if (context.error) {
    return <Message negative header="Error loading fossils" content={context.error} />;
  }
  if (!context.species) {
    return <Loader active content="Loading fossils..." />
  }
  const { players } = props;
  return (
    <Table compact>
      <Table.Body>
        {context.species.map(species => (
          <FossilTableSection
            key={species.id}
            speciesId={species.id}
            speciesName={species.name}
            pieces={species.pieces}
            players={players}
          />
        ))}
      </Table.Body>
    </Table>
  );
}
FossilTable.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FossilTable;
