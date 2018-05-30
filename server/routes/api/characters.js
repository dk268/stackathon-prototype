const { User, Item, Raid, Character } = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/characters/
router.get("/", async (req, res, next) => {
  console.log("/api/characters reached");
  console.log("point reached");
  const allCharacters = await Character.findAll({
    include: [Item, Raid, User]
  });
  res.json(allCharacters);
});

module.exports = router;
