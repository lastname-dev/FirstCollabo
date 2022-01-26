const DBInfo = require("./DBInfo.js");
const express = require("express");
const app = express();
const path = require("path");
const uniqid = require("uniqid");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require("mysql");
const db = mysql.createConnection({
  host: DBInfo.host,
  user: DBInfo.user,
  password: DBInfo.password,
  port: DBInfo.port,
  database: DBInfo.database,
});
var CryptoJS = require("crypto-js");
app.listen(3000, function () {});

app.use(express.static(path.join(__dirname, "react/build")));

app.get("/everyboards/:universityname", function (req, res) {
  const query = `select * from board where universityname = '${req.params.universityname}'`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get(
  "/getposts/:universityname/:boardname/:page/:numofposts",
  function (req, res) {
    const numberOfPosts = req.params.numofposts;
    const page = (req.params.page - 1) * numberOfPosts;
    const query = `select * from post where universityname = '${req.params.universityname}' and boardname = '${req.params.boardname}' order by id desc limit ${page}, ${numberOfPosts}`;
    db.query(query, function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    });
  }
);

app.get("/getpost/:universityname/:boardname/maxlenth", function (req, res) {
  const query = `select count(*) as sum from post where universityname = '${req.params.universityname}' and boardname = '${req.params.boardname}'`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/universities", function (req, res) {
  const query = `select * from university`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/react/build/index.html"));
});

app.post("/signin", function (req, res) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const hashValue = JSON.stringify(salt);
  const password = CryptoJS.PBKDF2(req.body.password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  })
    .toString()
    .slice(0, 100);
  const query = `insert into user values('${req.body.username}', '${password}', '${hashValue}', '${req.body.universityname}');`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send("/login");
    }
  });
});

app.post("/login", function (req, res) {
  const query = `select * from user where username = '${req.body.username}';`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      if (results.length === 0) {
        res.send("none");
      } else {
        const salt = JSON.parse(results[0].salt);
        const inputPassword = CryptoJS.PBKDF2(req.body.password, salt, {
          keySize: 512 / 32,
          iterations: 1000,
        })
          .toString()
          .slice(0, 100);
        if (inputPassword === results[0].password) {
          res.send(results[0].universityname);
        } else {
          res.send("none");
        }
      }
    }
  });
});

app.post("/newpost", function (req, res) {
  const id = uniqid();
  const boardname = req.body.boardname;
  const title = req.body.title;
  const content = req.body.content;
  const date = req.body.date;
  const universityname = req.body.universityname;
  const username = req.body.username;
  const query = `insert into post values('${id}', '${boardname}', '${title}', '${content}', '${date}', 0, 0, '${universityname}', '${username}');`;
  db.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
    } else {
      res.send(true);
    }
  });
});
