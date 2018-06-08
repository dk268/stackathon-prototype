'use strict';

const db = require('./database.js');
const Sequelize = require('sequelize');

const User = require('./User.js');
const Item = require('./Item.js');
const Raid = require('./Raid.js');
const Character = require('./Character.js');
const Checkpoint = require('./Checkpoint.js');

// models! If there's a lot, make /models folder
Character.belongsToMany(Raid, { through: `character_raid` });
Character.belongsToMany(Checkpoint, { through: `character_checkpoint` });
Character.hasMany(Item);
Item.belongsTo(Character);
Item.belongsToMany(Raid, { through: `item_raid` });
Raid.belongsToMany(Character, { through: `character_raid` });
Raid.belongsToMany(Item, { through: `item_raid` });
Raid.hasMany(Checkpoint);
User.hasMany(Character);
Character.belongsTo(User);
Checkpoint.belongsToMany(Character, { through: `character_checkpoint` });
Checkpoint.belongsTo(Raid);

module.exports = {
  db,
  Item,
  Raid,
  User,
  Character,
  Checkpoint,
};
