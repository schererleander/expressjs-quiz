const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create an Express application
const app = express();

// Enable CORS for all routes (allow all origins)
app.use(cors({ origin: '*' }));
app.use(express.json());


// ----------------------
// ⚠️ Change with the information specific to your MySQL server ⚠️
// ----------------------
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "wibso3-rIdwaz-dejrob",
  database: "questions"
});


app.use(express.static(__dirname));

app.get("/retrieve", (req, res) => {
  const query = "SELECT * FROM allgemein";

  con.query(query, (error, results) => {
    if (error) {
      console.error("ERROR query:", error);
      res.status(500).send("Internal server error!");
      return;
    }
    res.json(results);
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