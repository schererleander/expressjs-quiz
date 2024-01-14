const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log("HTTP " + req.method + " " + req.url);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  res.on('finish', () => {
    console.log(res.statusCode + ":" + res.statusMessage);
    console.log('Response Headers:', res.getHeaders());
    console.log("body:", res.body);
  });

  next();
});

app.use(express.json())
app.use(express.static(__dirname));

// ----------------------
// ⚠️ Change with the information specific to your MySQL server ⚠️
// ----------------------
const mysql = require('mysql2');
var con = mysql.createPool({
  host: "0.0.0.0",
  port: 3306,
  user: "root",
  password: "root",
  database: "questions"
});

app.get("/retrieve", (req, res) => {

  const query = "SELECT * FROM allgemein";

  con.query(query, (error, results) => {
    if (error) {
      console.error("ERROR query:", error);
      res.status(500).send("Internal server error!");
      return;
    } else res.json(results);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  if (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/submit", (req, res) => {
  const { question, solution} = req.body;
  console.log("Received data:", {question, solution});

  const insertQuery = "INSERT INTO allgemein (question, solution) VALUES ('" + question + "','" + solution + "')";
  con.query(insertQuery, (error, results) => {
    if(error) {
      console.error("ERROR inserting data into database");
      console.error(error);
      res.status(500).send("Internal Server error!")
    } else res.status(200).send("Data received successfully!"); 
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});