const express = require('express');
const router = express.Router();

const { runQuery } = require('../db');

router.get('/',
  runQuery(`
    SELECT
      species.id AS species_id,
      species.name as species_name,
      piece.id as piece_id,
      piece.name as piece_name
    FROM fossil.species
    JOIN fossil.piece ON piece.species_id = species.id
    ORDER BY piece.id;
  `),
  (req, res, next) => {
    let result = [];
    for (const row of req.queryResult.rows) {
      const piece = { id: row.piece_id, name: row.piece_name };
      if (result.length > 0 && result[result.length - 1].id === row.species_id) {
        result[result.length - 1].pieces.push(piece);
      } else {
        result.push({ id: row.species_id, name: row.species_name, pieces: [piece] });
      }
    }
    res.send({ species: result });
  }
);

module.exports = router;
