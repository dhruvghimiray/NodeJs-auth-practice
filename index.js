const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")


app.use(cookieParser())

// password encryption
app.get("/encrypt", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("HelloPassword", salt, function (err, hash) {
      res.send("Hello World");
      console.log(`password: HelloPassword, encrypted password: ${hash}`);
    });
  });
});

// check password
app.get("/check", (req, res) => {
  bcrypt.compare(
    "Hellopassword",
    "$2b$10$tp.LKIJCJ0waDxdtJQVN4uz3JQaXtdQp9mTLL3nHwDIrW/oRR7vwG",
    function (err, result) {
      if (result == true) {
        console.log("Passowrd Matched");
      } else {
        console.log("not matched");
      }
      res.send("Password Checking");
    }
  );
});

// JWT creation and encryption
app.get("/jwtSet", (req, res)=> {
    let token = jwt.sign({email:"enample@email.com"}, "SECRET"); //secret is a secret key ment to be kept secret and safe
    res.cookie("token", token);
    res.send("JWT Created")
})

app.get("/jwtCheck", (req, res)=> {
    let data = jwt.verify(req.cookies.token, "SECRET");
    console.log(data);
    res.send("JWT Verified")
})

app.listen(3000);
