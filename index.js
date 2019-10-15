Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@seananigan 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


1
00seananigan/Tokidex
 Code Issues 0 Pull requests 0 Projects 0 Wiki Security Insights Settings
Tokidex/index.js
 Sean Dales previous index
77c41ed 2 hours ago
45 lines (41 sloc)  1.31 KB
  
Jump to definition is available!Beta
Navigate your code with ease. In select public repositories, you can now click on function and method calls to jump to their definitions in the same repository. Learn more

 Jump to definition is still being calculated for this commit. Check back in a bit. Beta

Learn more or give us feedback
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {res.render('pages/tokidex')});
app.get('/add', (req,res) => { res.render('pages/add')});
app.get('/users', (req,res) => {
  var getUsersQuery = `SELECT * FROM userstab`;
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
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
