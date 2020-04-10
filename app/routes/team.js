const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const { runQuery } = require('../db');
const { param, body, validateParams } = require('../validation');

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
    (req) => ({ code: shortid.generate(), ...req.body })
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
    (req) => ({ code: req.params.code, name: req.body.name })
  ),
  (req, res, next) => {
    if (req.queryResult.rowCount <= 0) {
      return res.status(404).send({ message: `No team found with code '${req.params.code}'` });
    }
    res.send({ team: req.queryResult.rows[0] });
  }
);

router.post('/:code/player', [
    param('code').isString().isLength({ min: 1, max: 128 }),
    body('name').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  runQuery(`
    WITH t AS (SELECT id FROM fossil.team WHERE code = $code)
    INSERT INTO fossil.player (team_id, name) VALUES 
      ((SELECT id FROM t), $name)
    RETURNING *;`,
    (req) => ({ code: req.params.code, name: req.body.name })
  ),
  (req, res, next) => {
    const player = req.queryResult.rows[0];
    res.status(201).send({ player });
  }
);

router.post('/:code/player/:id', [
    param('code').isString().isLength({ min: 1, max: 128 }),
    param('id').isInt().toInt(),
    body('name').isString().isLength({ min: 1, max: 128 }),
  ],
  validateParams,
  runQuery(`
    WITH t AS (SELECT id FROM fossil.team WHERE code = $code)
    UPDATE fossil.player SET name = $name
    WHERE team_id = (SELECT id FROM t) AND id = $id RETURNING *;`,
    (req) => ({ code: req.params.code, id: req.params.id, name: req.body.name })
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
  runQuery(`
    WITH p AS (
      WITH t AS (
        SELECT id FROM fossil.team WHERE code = $code
      )
      SELECT id FROM fossil.player WHERE team_id = (SELECT id FROM t) AND id = $id
    )
    INSERT INTO fossil.have (player_id, piece_id) VALUES ((SELECT id FROM p), $pieceId)
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
  runQuery(`
    WITH p AS (
      WITH t AS (
        SELECT id FROM fossil.team WHERE code = $code
      )
      SELECT id FROM fossil.player WHERE team_id = (SELECT id FROM t) AND id = $id
    )
    DELETE FROM fossil.have WHERE player_id = (SELECT id FROM p) AND piece_id = $pieceId;`,
    req => req.params
  ),
  (req, res, next) => {
    res.status(204).send();
  }
);

router.get('/:code',
  runQuery(`
    WITH t AS (SELECT * FROM fossil.team WHERE code = $code)
    SELECT
      (SELECT id FROM t) AS team_id,
      (SELECT name FROM t) as team_name,
      (SELECT code FROM t) as team_code,
      player.id AS player_id,
      player.name AS player_name,
      piece_id
    FROM fossil.player LEFT JOIN fossil.have ON have.player_id = player.id
      WHERE team_id = (SELECT id FROM t)
    ORDER BY player.id;`,
    req => req.params,
  ),
  (req, res, next) => {
    const { rowCount, rows } = req.queryResult;
    if (rowCount <= 0) {
      return res.status(404).send({ message: `No team found with code '${req.params.code}'` });
    }
    let players = [];
    let player = { id: null, name: null, pieces: [] };
    for (const row of rows) {
      if (row.player_id !== player.id) {
        if (player.id) {
          players.push(player);
        }
        player = { id: row.player_id, name: row.player_name, pieces: [] };
      }
      if (row.piece_id) {
        player.pieces.push(row.piece_id);
      }
    }
    if (player.id) {
      players.push(player);
    }
    res.send({ id: rows[0].team_id, name: rows[0].team_name, code: rows[0].team_code, players });
  }
);

module.exports = router;
