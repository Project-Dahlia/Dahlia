"use strict";

//Import requirement modules
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Parking User");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
