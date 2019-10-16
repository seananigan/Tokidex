const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  connectionString: 'postgres://postgres:postgres@localhost/tokidextable2'
});
pool.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

   var createTable = `CREATE TABLE IF NOT EXISTS public.tokidextable2 (name varchar(50), trainer varchar(50), height int, weight int, fire int, water int, electric int, 
   fly int, fight int, ice int)`
  pool.query(createTable,(error, result) => {});
  {res.render('pages/tokidex')}
});

app.get('/addform', (req,res) => { res.render('pages/addform')});

app.get('/view', (req,res) => { res.render('pages/viewAll')});

app.get('/viewAll', (req,res) => {
  var viewQuery = `SELECT * FROM tokidextable2`;
  console.log(viewQuery);
  pool.query(viewQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(results);
    res.render('pages/viewAll', results)
  });
});
// app.get('/users/:id', (req,res) => {
//   console.log(req.params.id);
//   var userIDQuery = `SELECT * FROM userstab WHERE uid=${req.params.id}`;
// });
app.post('/submit', (req, res) => {
  //console.log('post');
  // var newName = req.body.nameInput;
  // var newTrainer = req.body.trainerInput;
  // var newHeight = req.body.heightInput;
  // var newWeight = req.body.weightInput;
  // var newFire = req.body.fireInput;
  // var newWater = req.body.waterInput;
  // var newElectric = req.body.electricInput;
  // var newFly = req.body.flyInput;
  // var newFight = req.body.fightInput;
  // var newIce = req.body.iceInput;

  // res.send(`Hello, ${newName}.  You have height ${newHeight}`) ;

  var insertQuery = `INSERT INTO tokidextable2(name, trainer, height, weight, fire, water, electric, fly, fight, ice) 
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