const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  // connectionString: process.env.DATABASE_URL
  connectionString: 'postgres://postgres:@localhost/tokidextable2'
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {

   var createTable = ` CREATE TABLE IF NOT EXISTS tokidexdb (name varchar(50) NOT NULL, trainer varchar(50) NOT NULL, height int, weight int, fire int, water int, electric int, 
   fly int, fight int, ice int)`
  pool.query(createTable,(error, result) => {});
  {res.render('pages/tokidex')}
});

app.get('/add', (req,res) => { res.render('pages/addform')});

app.get('/view', (req,res) => { res.render('pages/viewAll')});

app.get('/view', (req,res) => {
  var getUsersQuery = `SELECT * FROM tokidexdb`;
  console.log(getUsersQuery);
  pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(results);
    res.render('pages/view', results)
  });
});
app.get('/users/:id', (req,res) => {
  console.log(req.params.id);
  var userIDQuery = `SELECT * FROM userstab WHERE uid=${req.params.id}`;
});
app.post('/submit', (req, res) => {
  //console.log('post');
  var newName = req.body.nameInput;
  var newTrainer = req.body.trainerInput;
  var newHeight = req.body.heightInput;
  var newWeight = req.body.weightInput;
  var newFire = req.body.fireInput;
  var newWater = req.body.waterInput;
  var newElectric = req.body.electricInput;
  var newFly = req.body.flyInput;
  var newFight = req.body.fightInput;
  var newIce = req.body.iceInput;

  // res.send(`Hello, ${newName}.  You have height ${newHeight}`);

  `INSERT INTO tokidexdb
  VALUES (${req.body.newName}, ${req.body.newTrainer}, ${req.body.newHeight}, ${req.body.newWeight}, ${req.body.newFire}, 
    ${req.body.newWater}, ${req.body.newElectric}, ${req.body.newFly}, ${req.body.newFight}, ${req.body.newIce})`;
});

app.get('/login', (req, res) => {
  res.render('login');
 });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));