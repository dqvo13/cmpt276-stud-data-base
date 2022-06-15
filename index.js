require('dotenv').config();
const { json } = require('express');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const pgp = require('pg-promise')();

// connect to postgreSQL
const { Pool } = require('pg');
var pool = new Pool({
  // localhost server
  // connectionString: 'schema://user:password@host/database'
  connectionString: 'postgres://postgres:adm1n-superroot@localhost/students'

  // heroku server
  
  // connectionString: process.env.DATABASE_URL
  /*
  ssl: {
    rejectUnauthorized: false
  }
  */
});
var pool2 = new Pool({
  connectionString: 'postgres://postgres:adm1n-superroot@localhost/students'
})
var connectionString = 'postgres://postgres:adm1n-superroot@localhost/students'
const db = pgp(connectionString)
// pool.connect()

app = express();

// understand JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// basic routing
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  var getStudentsQuery = `SELECT * FROM studData`;
  pool.query(getStudentsQuery, (err, result) => {
    if (err) res.end(err);                  // end response if there's an error
    var tableObj = {'rows':result.rows};    // JSON object containing results of query
    res.render('pages/studentDataHome', tableObj);
  })
});
app.route('/navAdd').get((req, res) => {
  // console.log("going to add page...")
  res.render('pages/studentDataAdd')
})

async function query (q) {
  const client = await pool.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}
async function query (q, p) {
  const client = await pool.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q, p)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}

// postgreSQL usages
app.get('/viewStudents', (req, res) => {
  var getStudentsQuery = `SELECT * FROM studData`;
  pool.query(getStudentsQuery, (err, result) => {
    if (err) res.end(err);                  // end response if there's an error
    var tableObj = {'rows':result.rows};    // JSON object containing results of query
    res.render('pages/studentBoxes', tableObj);
  })
})
/*
app.get('/editStudent/:id', (req, res) => {
  var studID = req.params.id;
  console.log("looking for student with ID " + studID);

  var selectStudentQuery = `SELECT * FROM studData WHERE id=$1`
  var values = studID

  pool.query(selectStudentQuery, values, (err, result) => {
    if (err) res.end(err);                  // end response if there's an error
    var tableObj = {'rows':result.rows};    // JSON object containing results of query
    res.render('pages/db', tableObj);
  })
})
*/
app.post('/addStudent', async (req, res) => {
  var db_studID = req.body.f_studID  
  var db_firstName = req.body.f_firstName
  var db_lastName = req.body.f_lastName
  var db_gpa = req.body.f_gpa
  var db_age = req.body.f_age
  var db_height = req.body.f_height
  var db_weight = req.body.f_weight
  var db_hairColour = req.body.f_hairColour

  var addStudentQuery = `INSERT INTO studData (id, fname, lname, gpa, age, height, weight, haircol, studid) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8)`
  var values = [db_firstName, db_lastName, db_gpa, db_age, db_height, db_weight, db_hairColour, db_studID];
  var getStudentsQuery = `SELECT * FROM studdata`
  
  const client = await pool.connect()
  try {
    const rows = await client.query(addStudentQuery, values)
    console.log("updated student:", values)
    // console.log(JSON.stringify(rows))
  } finally {
    client.release()
  }

  const client2 = await pool.connect()
  try {
    const rows = await client2.query(getStudentsQuery)
    console.log("select after add.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client2.release()
  }
})
app.post('/updateStudent', async (req, res) => {
  var db_ID = req.body.f_ID
  var db_studID = req.body.f_studID
  var db_firstName = req.body.f_firstName
  var db_lastName = req.body.f_lastName
  var db_gpa = req.body.f_gpa
  var db_age = req.body.f_age
  var db_height = req.body.f_height
  var db_weight = req.body.f_weight
  var db_hairColour = req.body.f_hairColour

  var updateStudentQuery = `UPDATE studdata SET fname=$1, lname=$2, gpa=$3, age=$4, height=$5, weight=$6, haircol=$7, studid=$8 WHERE id=$9`
  var values = [db_firstName, db_lastName, db_gpa, db_age, db_height, db_weight, db_hairColour, db_studID, db_ID]
  var getStudentsQuery = `SELECT * FROM studData`
  
  const client = await pool.connect()
  try {
    const rows = await client.query(updateStudentQuery, values)
    console.log("updated student:", values)
    // console.log(JSON.stringify(rows))
  } finally {
    client.release()
  }

  const client2 = await pool.connect()
  try {
    const rows = await client2.query(getStudentsQuery)
    console.log("select after update.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client2.release()
  }
})

app.post('/deleteStudent/:id', (req, res) => {
  var db_ID = req.params.id

  var deleteStudentQuery = `DELETE FROM studdata WHERE id=$1`
  var values = [db_ID]

  pool.query(deleteStudentQuery, values, (err, result) => {
    if (err) res.end(err);
    console.log("deleted student with id=", db_ID);
    res.render('pages/studentDataHome');
  })
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
