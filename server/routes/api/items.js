const {
  User,
  Item,
  Raid,
  Character,
  Checkpoint,
} = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/items/

router.get("/", async (req, res, next) => {
  const allItems = await Item.findAll({
    include: [Character, { model: Raid, as: "RaidAcquired" }],
    order: [[Character, "characterName", "ASC"]],
  });
  res.json(allItems);
});

router.get("/:itemId", async (req, res, next) => {
  const oneItem = await Item.findById(req.params.itemId, {
    include: [Character, { model: Raid, as: "RaidAcquired" }],
    order: [[Character, "characterName", "ASC"]],
  });
  res.json(oneItem);
});

router.post("/", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    if (req.body.character.id)
      await setCharacterToItem(req.body.character, newItem);
    if (req.body.raid.id) await setRaidToItem(req.body.raid, newItem);
    res.json(newItem);
  } catch (e) {
    next(e);
  }
});

router.put("/:itemId", async (req, res, next) => {
  try {
    const [, updatedItem] = await Item.update(req.body, {
      where: {
        id: itemId,
      },
      returning: true,
      plain: true,
    });
    res.json(updatedItem);
  } catch (e) {
    next(e);
  }
});

router.delete("/:itemId", async (req, res, next) => {
  try {
    await Item.destroy({ where: { id: req.params.itemId } });
    const remainingItems = await Item.findAll();
    res.json(remainingItems);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

const setCharacterToItem = async (character, item) => {
  const char = await Character.findById(character.id);
  await item.setCharacter(char);
};

const setRaidToItem = async (raid, item) => {
  const foundRaid = Raid.findById(raid.id);
  await item.setRaidAcquired(foundRaid);
};
