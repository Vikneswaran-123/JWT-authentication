const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});



app.post("/api/login", (req, res) => {
  // Mock User
  const user = {
    id: 1,
    username: "Viknes",
    email: "vikneswaranvk1996@gmail.com",
  };
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});
// Format of Token
// Authorisation:bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
  // Get auth header Value
  const bearerHeader = req.get("Authorization");
  console.log(bearerHeader)
  //Check If Beareris undefined
  if (typeof bearerHeader !== "undefined") {
    //   Split at a Space
    const bearer = bearerHeader.split(" ");
    // Get Token from array
    const bearerToken = bearer[1];
    // Set the Token
    req.token = bearerToken;
    next();
  } else {
    //   Forbidden
    res.sendStatus(403);
  }
}

app.post("/api/post", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
          console.log(err)
        res.sendStatus(403);
      } else {
        res.json({
          message: "Posts Created",
          authData,
        });
      }
    });
  });

app.listen(5000, () => console.log("Server Started at 5000"));
