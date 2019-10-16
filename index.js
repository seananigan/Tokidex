const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
  //connectionString: 'postgres://postgres:postgres@localhost/tokidexdb'
});
pool.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

   var createTable = `CREATE TABLE IF NOT EXISTS public.tokidextable3 (toki_id serial, name varchar(50), trainer varchar(50), height int, weight int, fire int, water int, electric int, 
   fly int, fight int, ice int)`
  pool.query(createTable,(error, result) => {});
  {res.render('pages/tokidex')}
});

app.get('/addform', (req,res) => { res.render('pages/addform')});

app.get('/deleted', (req,res) => { res.render('pages/deleted')});

app.get('/edit', (req,res) => { res.render('pages/edit')});

app.get('/view', (req,res) => { res.render('pages/viewAll')});

app.get('/viewAll', (req,res) => {
  var viewQuery = `SELECT * FROM tokidextable3`;
  console.log(viewQuery);
  pool.query(viewQuery, (error, result) => {
    if (error)
      res.end(error);
    
    var results = {'rows': result.rows };
    console.log(results);
    
    res.render('pages/viewAll', results)
  });
});

app.get('/remove/:toki_id', (req,res) => {
  var deleteQuery = `DELETE FROM tokidextable3 WHERE toki_id=${req.params.toki_id}`;
  pool.query(deleteQuery, (error, result) => {
      if (error)
          res.end(error);
  });
  res.render('pages/deleted')
});

app.get('/info/:toki_id', (req,res) => {
  req.params.id
  var idQuery = `SELECT * FROM tokidextable3 WHERE toki_id=${req.params.toki_id}`;
  pool.query(idQuery, (error, result) => {
      if (error)
          res.end(error);
      var results = {'rows': result.rows };
      res.render('pages/info', results)
  });
});

// app.get('/users/:id', (req,res) => {
//   console.log(req.params.id) ;
//   var userIDQuery = `SELECT * FROM userstab WHERE uid=${req.params.id}`;
// });

app.post('/submit', (req, res) => {


  var insertQuery = `INSERT INTO tokidextable3(name, trainer, height, weight, fire, water, electric, fly, fight, ice) 
    VALUES ('${req.body.nameInput}', '${req.body.trainerInput}', '${req.body.heightInput}', '${req.body.weightInput}', '${req.body.fireInput}', 
    '${req.body.waterInput}', '${req.body.electricInput}', '${req.body.flyInput}', '${req.body.fightInput}', '${req.body.iceInput}')`;
    console.log(insertQuery);
    pool.query(insertQuery, (error, result) => {
      if (error)
        res.end(error);
    });
    res.render('pages/tokidex')
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));