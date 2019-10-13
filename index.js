const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/tokidex'))

  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  // .get('/users', (req,res) => {
  //   var getUsersQuery = `SELECT * FROM userstab`;
  //   console.log(getUsersQuery);
  //   pool.query(getUsersQuery, (error, result) => {
  //     if (error)
  //       res.end(error);
  //     var results = {'rows': result.rows };
  //     console.log(results);
  //     res.render('pages/users', results)
  //   });
  // })
  

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))