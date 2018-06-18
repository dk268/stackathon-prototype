const db = require("./database.js");
const Sequelize = require("sequelize");

const Character = db.define("character", {
  characterName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dkp: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isAlt: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isAltUnapproved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  class: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  totalDKPSpent: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalDKPEarned: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  overflowDKP: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Character.prototype.spendDKP = async function(num) {
  await this.update({ dkp: this.dkp - num, totalDKPSpent: this.totalDKPSpent });
};

Character.prototype.earnDKP = async function(num) {
  await this.update({ dkp: this.dkp + num });
};

module.exports = Character;
