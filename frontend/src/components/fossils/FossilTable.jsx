import React, { useContext } from 'react';

import { Table } from 'semantic-ui-react';

import { FossilsContext } from '../../contexts/FossilsContext.jsx';

import FossilTableSection from './FossilTableSection.jsx';

function FossilTable(props) {
  const context = useContext(FossilsContext);
  return (
    <Table compact>
      <Table.Body>
        {context.species.map(species => (
          <FossilTableSection
            key={species.id}
            speciesId={species.id}
            speciesName={species.name}
            pieces={species.pieces}
          />
        ))}
      </Table.Body>
    </Table>
  );
}

export default FossilTable;
