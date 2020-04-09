const express = require('express');
const router = express.Router();

const fossilsRouter = require('./fossils');

router.use('/fossils', fossilsRouter);

module.exports = router;
