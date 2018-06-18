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
        id: {
          [Op.in]: items.map(c => c.id),
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
