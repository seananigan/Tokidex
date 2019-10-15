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

app.get('/view', (req,res) => {
  var getUsersQuery = `SELECT * FROM tokidexdb`;
  console.log(getUsersQuery);
  pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(results);
    res.render('pages/users', results)
  });
});
app.get('/users/:id', (req,res) => {
  console.log(req.params.id);
  var userIDQuery = `SELECT * FROM userstab WHERE uid=${req.params.id}`;
});
app.post('/login', (req, res) => {
  //console.log('post');
  var username = req.body.user;
  var password = req.body.pwd;
  res.send(`Hello, ${username}.  You have password ${password}`);
});

app.get('/login', (req, res) => {
  res.render('login');
 });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));