const { param, body, validationResult } = require('express-validator');

function validateParams(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors.array());
  res.status(400).send({ message: errors.array()[0].msg });
}

module.exports = { param, body, validateParams };
