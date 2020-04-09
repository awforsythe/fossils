const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ species: [
    {
      id: 1,
      name: 'testosaurus',
      pieces: [
        { id: 1, name: 'test head' },
        { id: 2, name: 'test torso' },
        { id: 3, name: 'test tail' },
      ],
    },
  ]});
});

module.exports = router;
