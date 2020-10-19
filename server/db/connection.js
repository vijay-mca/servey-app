const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "vijay",
  password: "vijay",
  database: "servey",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
