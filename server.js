"use strict";

const { db } = require("./server/db/index.js");
const app = require("./server/index.js");
const PORT = process.env.PORT || 1337;
const chalk = require("chalk");

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log(chalk.bold("database synchronized"));
    app.listen(PORT, () =>
      console.log(chalk.bgCyan(`server listening on port ${PORT}`))
    );
  });
