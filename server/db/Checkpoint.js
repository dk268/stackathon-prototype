const db = require('./database.js');
const Sequelize = require('sequelize');

const Checkpoint = db.define('checkpoint', {
  checkpointName: Sequelize.STRING,
  checkpointDKP: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
  },
});

module.exports = Checkpoint;
