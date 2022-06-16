const { json } = require('express');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// connect to postgreSQL
const { Pool } = require('pg');
const pool = new Pool({
  // localhost server
  // connectionString: 'schema://user:password@host/database'
  // connectionString: 'postgres://postgres:adm1n-superroot@localhost/students'

  // heroku server
  connectionString: process.env.DATABASE_URL || 'postgres://nijehxhqiuhmjt:3d8f844ec8fdf41178a3485d76cb82b45187dbb614a97cfe82a333bc83185ce0@ec2-54-157-16-196.compute-1.amazonaws.com:5432/d8b74thd5taace',
  
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
  
  // ssl: process.env.DATABASE_URL ? true : false
});

app = express();

// understand JSON
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// basic routing
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  var getStudentsQuery = `SELECT * FROM studData`;
  console.log("base routing...");
  
  const client = await pool.connect();
  try {
    const rows = await client.query(getStudentsQuery)
    console.log("home SELECT.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client.release()
  }
  
  /*
  pool.query(getStudentsQuery, (err, result) => {
    if (err) {
      console.log("error occurred :(")
      res.end(err);
    }                  // end response if there's an error
    var tableObj = {'rows':result.rows};    // JSON object containing results of query
    console.log(tableObj);
    res.render('pages/studentDataHome', tableObj);
  })
  */
});
app.route('/navAdd').get((req, res) => {
  console.log("going to add page...")
  res.render('pages/studentDataAdd')
})


/***************************************************************** 
 *                PostgreSQL Connections
*****************************************************************/
/**
 * VIEW students
 */
app.get('/viewStudents', (req, res) => {
  var getStudentsQuery = `SELECT * FROM studData`;
  pool.query(getStudentsQuery, (err, result) => {
    if (err) res.end(err);                  // end response if there's an error
    var tableObj = {'rows':result.rows};    // JSON object containing results of query
    // console.log(result.rows);
    res.render('pages/studentBoxes', tableObj);
  })
})

/**
 * ADD a student
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
    console.log("SELECT after INSERT.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client2.release()
  }
})

/**
 * UPDATE a student (home)
 */
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
    console.log("SELECT after UPDATE.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client2.release()
  }
})

/**
 * UPDATE a student (box)
 */
 app.post('/updateStudentBox', async (req, res) => {
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
    console.log("SELECT after UPDATE.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentBoxes', rows);
  } finally {
    client2.release()
  }
})

/**
 * DELETE a student
 */
app.get('/deleteStudent/:id', async (req, res) => {
  var db_ID = req.params.id

  var deleteStudentQuery = `DELETE FROM studdata WHERE id=$1`
  var values = [db_ID]
  var getStudentsQuery = `SELECT * FROM studdata`

  const client = await pool.connect()
  try {
    const rows = await client.query(deleteStudentQuery, values)
    console.log("deleted student:", values)
    // console.log(JSON.stringify(rows))
  } finally {
    client.release()
  }

  const client2 = await pool.connect()
  try {
    const rows = await client2.query(getStudentsQuery)
    console.log("SELECT after DELETE.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentDataHome', rows);
  } finally {
    client2.release()
  }
})

app.get('/deleteStudentBox/:id', async (req, res) => {
  var db_ID = req.params.id

  var deleteStudentQuery = `DELETE FROM studdata WHERE id=$1`
  var values = [db_ID]
  var getStudentsQuery = `SELECT * FROM studdata`

  const client = await pool.connect()
  try {
    const rows = await client.query(deleteStudentQuery, values)
    console.log("deleted student:", values)
    // console.log(JSON.stringify(rows))
  } finally {
    client.release()
  }

  const client2 = await pool.connect()
  try {
    const rows = await client2.query(getStudentsQuery)
    console.log("SELECT after DELETE.")
    // console.log(JSON.stringify(rows))
    res.render('pages/studentBoxes', rows);
  } finally {
    client2.release()
  }
})

/**
 * PORT LISTENING
 */
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
