"use strict";

// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

console.log(chalk.yellow("Opening database connection"));
console.log(chalk.blue(`process.env.SHELL: ${process.env.SHELL}`));

const currentDBUrl = `postgres://sctvjqlfeoszpk:c027269f585280bf0cbf45c694eed4f0b99b6fa44edc9861fd567bdb6b146093@ec2-54-235-132-202.compute-1.amazonaws.com:5432/daht5bo9gk4gq9`;
// create the database instance that can be used in other database files
const db = new Sequelize(
  // process.env.SHELL === "C:\\Program Files\\Git\\usr\\bin\\bash.exe"
  //   ? `postgres://postgres:moop@localhost:5432/${pkg.name}`
  //   : `postgres://localhost:5432/${pkg.name}`
  currentDBUrl,
  {
    logging: false, // so we don't see all the SQL queries getting made
  }
);
/* //for Heroku
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432:yourdbname', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});
*/

module.exports = db;
