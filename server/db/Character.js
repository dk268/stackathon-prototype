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
  class: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});

Character.prototype.spendDKP = async function(num) {
  await this.update({ dkp: this.dkp - num });
};

Character.prototype.earnDKP = async function(num) {
  await this.update({ dkp: this.dkp + num });
};

module.exports = Character;
