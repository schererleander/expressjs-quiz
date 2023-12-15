const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create an Express application
const app = express();

// Enable CORS for all routes (allow all origins)
app.use(cors({ origin: '*' }));

let topic = "allgemein";

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "wibso3-rIdwaz-dejrob",
  database: "questions"
});

app.get("/database", (req, res) => {
  const query = "SELECT * FROM " + topic;

  con.query(query, (error, results) => {
    if (error) {
      console.error("ERROR query:", error);
      res.status(500).send("Internal server error!");
      return;
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});