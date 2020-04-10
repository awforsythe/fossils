const router = require('express').Router();
const socket = require('../socket');
const { db } = require('../db');

router.ws('/team/:code', (ws, req) => {
  const teamCode = req.params.code;
  if (teamCode) {
    db.query('SELECT id FROM fossil.team WHERE code = $1;', [teamCode])
    .then(res => {
      if (res.rowCount > 0) {
        const teamId = res.rows[0].id;
        socket.register(ws, teamId);
        ws.on('close', (event) => {
          socket.unregister(ws, teamId);
        });
      }
    })
  }
});

module.exports = router;
