const {
  User,
  db,
  Item,
  Raid,
  Character,
  Checkpoint,
  Op,
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
    await setRaidsToCharacter(req.body.raids, updatedCharacter);
    await setItemsToCharacter(req.body.items, updatedCharacter);
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
  try {
    const foundRaids = await Raid.findAll({
      where: {
        raidName: {
          [Op.in]: raids.map(r => r.raidName),
        },
      },
    });
    await character.setRaids(foundRaids);
  } catch (e) {
    console.log(e);
  }
};

const setItemsToCharacter = async (items, character) => {
  try {
    const foundItems = await Item.findAll({
      where: {
        itemName: {
          [Op.in]: items.map(c => c.itemName),
        },
      },
    });
    await character.setItems(foundItems);
  } catch (e) {
    console.log(e);
  }
};

const setCheckpointsToCharacter = async (checkpoints, character) => {
  try {
    const foundCheckpoints = await Checkpoint.findAll({
      where: {
        checkpointName: {
          [Op.in]: checkpoints.map(c => c.checkpointName),
        },
      },
    });
    await character.setCheckpoints(foundCheckpoints);
  } catch (e) {
    console.log(e);
  }
};
