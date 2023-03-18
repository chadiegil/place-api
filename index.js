const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "place_api",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM place";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/place/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM place WHERE id=${id}`;
  db.query(sql, (err, result) => {
    ``;
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

app.post("/place", (req, res) => {
  const { name, email, phone } = req.body;
  const sql = `INSERT INTO place (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.put("/place/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const sql = `UPDATE place SET name='${name}', email='${email}', phone='${phone}' WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.delete("/place/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM place WHERE id=${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
