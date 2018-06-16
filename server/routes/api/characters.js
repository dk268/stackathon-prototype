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
      order: [["characterName", "ASC"]],
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
    if (req.body.raids.length)
      await setRaidsToCharacter(req.body.raids, newCharacter);
    if (req.body.items.length)
      await setItemsToCharacter(req.body.items, newCharacter);
    if (req.body.checkpoints.length)
      await setCheckpointsToCharacter(req.body.checkpoints, newCharacter);
    res.json(newCharacter);
  } catch (e) {
    next(e);
  }
});

router.put("/:charId", async (req, res, next) => {
  try {
    const [, updatedCharacter] = await Character.update(req.body, {
      where: {
        id: req.params.charId,
      },
      returning: true,
      plain: true,
    });
    if (req.body.raids.length)
      await setRaidsToCharacter(req.body.raids, updatedCharacter);
    if (req.body.items.length)
      await setItemsToCharacter(req.body.items, updatedCharacter);
    if (req.body.checkpoints.length)
      await setCheckpointsToCharacter(req.body.checkpoints, updatedCharacter);
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

const setRaidsToCharacter = async (raids, character) => {
  for (let i = 0; i < raids.length; i++) {
    const raid = await Raid.findById(raids[i].id);
    await raid.addCharacter(character);
  }
};

const setItemsToCharacter = async (items, character) => {
  for (let i = 0; i < items.length; i++) {
    const item = await Item.findById(items[i].id);
    await item.setCharacter(character);
  }
};

const setCheckpointsToCharacter = async (checkpoints, character) => {
  for (let i = 0; i < checkpoints.length; i++) {
    const checkpoint = await Checkpoint.findById(checkpoints[i].id);
    await checkpoint.addCharacter(character);
  }
};
