const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
  runQuery: (query, params) => (
    async (req, res, next) => {  
      let r;
      try {
        r = await pool.query(query, params);
      } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.stack });
      }
      req.queryResult = r
      next();
    }
  ),
};
