var mysql = require('mysql');

let count = 0;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wibso3-rIdwaz-dejrob"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});