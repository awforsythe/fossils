const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const { db, runQuery } = require('../db');
const { param, body, validateParams } = require('../validation');

async function validateTeamCode(req, res, next) {
  const r = await db.query('SELECT id FROM fossil.team WHERE code = $1;', [req.params.code]);
  if (r.rowCount !== 1) {
    return res.status(404).send({ message: `No team found with code '${req.params.code}'` });
  }
  req.teamId = r.rows[0].id;
  next();
}

async function validatePlayerId(req, res, next) {
  const r = await db.query(`
    WITH t AS (SELECT id FROM fossil.team WHERE code = $1)
    SELECT id FROM fossil.player WHERE team_id = (SELECT id FROM t)
    AND id = $2;
  `, [req.params.code, req.params.id]);
  if (r.rowCount !== 1) {
    return res.status(404).send({ message: `No player with ID ${req.params.id} belongs to a team with code '${req.params.code}'`});
  }
  next();
}

router.post('/', [
    body('teamName').isString().isLength({ min: 1, max: 128 }),
    body('playerName').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  runQuery(`
    WITH t AS (INSERT INTO fossil.team (code, name) VALUES ($code, $teamName) RETURNING *)
    INSERT INTO fossil.player (team_id, name) VALUES
      ((SELECT id FROM t), $playerName)
    RETURNING
      (SELECT id FROM t) as team_id,
      (SELECT name FROM t) as team_name,
      (SELECT code FROM t) as team_code,
      id AS player_id,
      name AS player_name;`,
    req => ({ code: shortid.generate(), ...req.body })
  ),
  (req, res, next) => {
    const row = req.queryResult.rows[0];
    res.status(201).send({
      team: { id: row.team_id, name: row.team_name, code: row.team_code },
      player: { id: row.player_id, name: row.player_name },
    });
  }
);

router.post('/:code', [
    body('name').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  runQuery(`
    UPDATE fossil.team SET name = $name
      WHERE code = $code
    RETURNING *;`,
    req => ({ code: req.params.code, name: req.body.name })
  ),
  (req, res, next) => {
    if (req.queryResult.rowCount <= 0) {
      return res.status(404).send({ message: `No team found with code '${req.params.code}'` });
    }
    res.send({ team: req.queryResult.rows[0] });
  }
);

router.post('/:code/player', [
    param('code').isString(),
    body('name').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  validateTeamCode,
  runQuery(`
    INSERT INTO fossil.player (team_id, name) VALUES 
      ($teamId, $name)
    RETURNING *;`,
    req => ({ teamId: req.teamId, name: req.body.name })
  ),
  (req, res, next) => {
    const player = req.queryResult.rows[0];
    res.status(201).send({ player });
  }
);

router.post('/:code/player/:id', [
    param('code').isString(),
    param('id').isInt().toInt(),
    body('name').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  validatePlayerId,
  runQuery(
    `UPDATE fossil.player SET name = $name WHERE id = $id RETURNING *;`,
    req => ({ id: req.params.id, name: req.body.name })
  ),
  (req, res, next) => {
    if (req.queryResult.rowCount <= 0) {
      return res.status(404).send({
        message: `No player with ID ${req.params.id} found in team with code '${req.params.code}'`
      });
    }
    res.send({ player: req.queryResult.rows[0] });
  }
);

router.post('/:code/player/:id/have/:pieceId', [
    param('code').isString(),
    param('id').isInt().toInt(),
    param('pieceId').isInt().toInt(),
  ],
  validateParams,
  validatePlayerId,
  runQuery(`
    INSERT INTO fossil.have (player_id, piece_id)
      VALUES ($id, $pieceId)
    ON CONFLICT DO NOTHING;`,
    req => req.params
  ),
  (req, res, next) => {
    res.status(204).send();
  }
);

router.post('/:code/player/:id/lose/:pieceId', [
    param('code').isString(),
    param('id').isInt().toInt(),
    param('pieceId').isInt().toInt(),
  ],
  validateParams,
  validatePlayerId,
  runQuery(`
    DELETE FROM fossil.have WHERE player_id = $id AND piece_id = $pieceId;`,
    req => req.params
  ),
  (req, res, next) => {
    res.status(204).send();
  }
);

router.get('/:code', [
    param('code').isString(),
  ],
  validateParams,
  async (req, res, next) => {
    // Look up the team: if the request doesn't have a valid code, abort
    const teamResult = await db.query('SELECT * FROM fossil.team WHERE code = $1;', [req.params.code]);
    if (teamResult.rowCount !== 1) {
      return res.status(404).send({ message: `No team found with code '${req.params.code}'` });
    }

    // Look up the set of players belonging to that team
    const playersResult = await db.query('SELECT id, name FROM fossil.player WHERE team_id = $1;', [teamResult.rows[0].id]);
    if (playersResult.rowCount === 0) {
      return res.send({ ...teamResult.rows[0], players: [] });
    }

    // Aggregate a list of piece IDs that each player has
    const playerIds = playersResult.rows.map(x => x.id);
    const haveResult = await db.query(`
      SELECT player_id, json_agg(piece_id) AS pieces FROM fossil.have
        WHERE player_id IN (${playerIds.map((_, i) => `$${i + 1}`).join(', ')})
      GROUP BY player_id;
    `, playerIds);

    // Construct a result players array, where each player has an id, a name, and a 'pieces' array listing piece IDs
    let players = [];
    for (const playerRow of playersResult.rows) {
      const haveRow = haveResult.rows.find(x => x.player_id == playerRow.id);
      const pieces = haveRow ? haveRow.pieces : [];
      players.push({ ...playerRow, pieces });
    }
    res.send({ ...teamResult.rows[0], players });
  }
);

module.exports = router;
