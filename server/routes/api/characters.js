const {
  User,
  Item,
  Raid,
  Character,
  Checkpoint,
} = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/characters/

router.get("/", async (req, res, next) => {
  try {
    const allCharacters = await Character.findAll({
      include: [Item, Raid, User, Checkpoint],
    });
    res.json(allCharacters);
  } catch (e) {
    next(e);
  }
});

router.get("/:charId", async (req, res, next) => {
  const oneCharacter = await Character.findById(req.params.charId, {
    include: [Item, Raid, User, Checkpoint],
  });
  res.json(oneCharacter);
});

router.post("/", async (req, res, next) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.json(newCharacter);
  } catch (e) {
    next(e);
  }
});

router.put("/:charId", async (req, res, next) => {
  try {
    const [, updatedCharacter] = await Character.update(req.body, {
      where: {
        id: charId,
      },
      returning: true,
      plain: true,
    });
    res.json(updatedCharacter);
  } catch (e) {
    next(e);
  }
});

router.delete("/:charId", async (req, res, next) => {
  try {
    await Character.destroy({ where: { id: req.params.charId } });
    const remainingCharacters = await Character.findAll();
    res.json(remainingCharacters);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
