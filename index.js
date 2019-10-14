// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });

// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/tokidex'))

//   .get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

//   .get('/users', (req,res) => {
//     var getUsersQuery = `SELECT * FROM userstab`;
//     console.log(getUsersQuery);
//     pool.query(getUsersQuery, (error, result) => {
//       if (error)
//         res.end(error);
//       var results = {'rows': result.rows };
//       console.log(results);
//       res.render('pages/users', results)
//     });
//   })
  

//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))



// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000
// const bodyParser = require('body-parser')
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .use(express.urlencoded({extended : false}))
//   .use(bodyParser())
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/tokidex'))
//   .get('/landingpage', (req, res) => res.render('pages/viewAll'))
//   // .get('/add', (req, res) => res.render('pages/addnew'))
//   .get('/landingpage', (req, res) => res.sendfile(path.join(__dirname+'/views/pages/tokidexViewAll.ejs')))
//   .get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

//   .get('/users', (req,res) => {
//     var getUsersQuery = `SELECT * FROM userstab`;
//     console.log(getUsersQuery);
//     pool.query(getUsersQuery, (error, result) => {
//       if (error)
//         res.end(error);
//       var results = {'rows': result.rows };
//       console.log(results);
//       res.render('pages/users', results)
//     });
//   })  
  
//   // .post('/add', (req,res) => {
//   //   var updateUsersQuery = `INSERT INTO userstab (username) VALUES ('${req.body["word"]}')`;
//   //   console.log(updateUsersQuery);
//   //   pool.query(updateUsersQuery, (error, result) => {
//   //     if (error)
//   //       res.end(error);
//   //     console.log('Hello');
//   //     var results = {'rows': result.rows };
//   //     console.log(results);
//   //     res.send('POST request to the homepage')
//   //   });
//   // }) 
  
//
//    .listen(PORT, () => console.log(`Listening on ${ PORT }`))


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
app.get('/hello', (req,res) => { res.render('pages/tokidex')});
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
