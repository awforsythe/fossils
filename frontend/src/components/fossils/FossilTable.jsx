import React, { useContext } from 'react';

import { FossilsContext } from '../../contexts/FossilsContext.jsx';

import FossilTableSection from './FossilTableSection.jsx';

function FossilTable(props) {
  const context = useContext(FossilsContext);
  return (
    <table style={{ border: '1px solid black' }}>
      <tbody>
        {context.species.map(species => (
          <FossilTableSection
            key={species.id}
            speciesId={species.id}
            speciesName={species.name}
            pieces={species.pieces}
          />
        ))}
      </tbody>
    </table>
  );
}

export default FossilTable;
