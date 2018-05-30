"use strict";

const db = require("./database.js");
const Sequelize = require("sequelize");
const crypto = require("crypto");
const _ = require("lodash");
const User = require("./User.js");
const Item = require("./Item.js");
const Raid = require("./Raid.js");
const Character = require("./Character.js");

// models! If there's a lot, make /models folder
Character.belongsToMany(Raid, { through: `character_raid` });
Character.belongsToMany(Item, { through: `character_item` });
Item.belongsToMany(Character, { through: `character_item` });
Item.belongsToMany(Raid, { through: `item_raid` });
Raid.belongsToMany(Character, { through: `character_raid` });
Raid.belongsToMany(Item, { through: `item_raid` });
User.hasMany(Character);
Character.belongsTo(User);

module.exports = {
  db,
  Item,
  Raid,
  User,
  Character
};
