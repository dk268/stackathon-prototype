"use strict";

const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const { db } = require("./db/index.js");
const passport = require("passport");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db });
dbStore.sync();

// const volleyball = require("volleyball");
// app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "../server/public")));

app.use(
  session({
    secret: "a wildly insecure secret",
    // secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../server/public/index.html"));
}); // Send index.html for any other requests
app.use("/", require("./routes/index.js"));

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
