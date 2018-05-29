"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../server/public")));

// app.use("/api", require("./api"));
// app.use("/ROUTENAME", require("./routes/ROUTENEAME"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../server/public/index.html"));
}); // Send index.html for any other requests

// error handling middleware
app.use((req, res, next) => {
  try {
    res.redirect(404, `/404`);
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
