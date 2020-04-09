const { Pool } = require('pg');

const pool = new Pool();

function interpolateQuery(queryStr, paramsObj) {
  // Copy the string so we can modify it in-place (this kind of string manipulation isn't super optimized, but eh)
  let query = (' ' + queryStr).slice(1);
  
  // Short-circuit optimization: if the query has no no named variables, skip interpolation
  const regexp = /\$([a-zA-Z_]\w+)/g;
  if (!regexp.exec(queryStr)) {
    return [queryStr, []];
  }

  // Run a loop to replace named parameters with $1, $2, $3, etc., and build an accompanying array of values
  let params = [];
  while (true) {
    // Keep matching named variables ($param) until we've replaced them all with numeric sentinels ($1)
    regexp.lastIndex = 0;
    const match = regexp.exec(query);
    if (!match) {
      break;
    }

    // Add the corresponding value (or null) to the params array, and replace all occurrences in the query string
    const value = paramsObj[match[1]];
    params.push(value !== undefined ? value : null);
    query = query.replace(new RegExp('\\$' + match[1], 'g'), '$' + params.length);
  }

  return [query, params];
}

module.exports = {
  runQuery: (query, paramsFunc) => (
    async (req, res, next) => {
      let params;
      try {
        params = paramsFunc ? paramsFunc(req) : null;
      } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err });
      }
  
      let r;
      try {
        r = await pool.query(...interpolateQuery(query, params));
      } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err.stack });
      }
      req.queryResult = r
      next();
    }
  ),
};
