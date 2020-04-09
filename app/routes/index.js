const express = require('express');
const router = express.Router();

const fossilsRouter = require('./fossils');
const teamRouter = require('./team');

router.use('/fossils', fossilsRouter);
router.use('/team', teamRouter);

module.exports = router;
