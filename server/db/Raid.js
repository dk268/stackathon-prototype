const db = require("./database.js");
const Sequelize = require("sequelize");

const Raid = db.define("raid", {
  raidName: Sequelize.STRING,
  raidDate: Sequelize.DATE,
  raidDKP: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  }
});

module.exports = Raid;
