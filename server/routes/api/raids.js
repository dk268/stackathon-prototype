const {
  User,
  Item,
  Raid,
  Character,
  Checkpoint,
} = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/checkpoints/

router.get("/", async (req, res, next) => {
  const allRaids = await Raid.findAll({
    include: [Item, Character, Checkpoint],
    order: [[Character, "characterName", "ASC"]],
  });
  res.json(allRaids);
});

router.get("/:raidId", async (req, res, next) => {
  const oneRaid = await Raid.findById(req.params.raidId, {
    include: [Item, Character, Checkpoint],
  });
  res.json(oneRaid);
});

router.post("/", async (req, res, next) => {
  try {
    const newRaid = await Raid.create(req.body);
    if (req.body.checkpoints.length)
      await setCheckpointsToRaid(req.body.checkpoints, newRaid);
    if (req.body.items.length) await setItemsToRaid(req.body.items, newRaid);
    res.json(newRaid);
  } catch (e) {
    next(e);
  }
});

router.put("/:raidId", async (req, res, next) => {
  try {
    const [, updatedRaid] = await Raid.update(req.body, {
      where: {
        id: req.params.raidId,
      },
      returning: true,
      plain: true,
    });
    if (req.body.checkpoints.length)
      await setCheckpointsToRaid(req.body.checkpoints, updatedRaid);
    if (req.body.items.length)
      await setItemsToRaid(req.body.items, updatedRaid);
    res.json(updatedRaid);
  } catch (e) {
    next(e);
  }
});

router.delete("/:raidId", async (req, res, next) => {
  try {
    await Raid.destroy({ where: { id: req.params.raidId } });
    const remainingRaids = await Raid.findAll();
    res.json(remainingRaids);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

const setCheckpointsToRaid = async (checkpoints, raid) => {
  for (let i = 0; i < checkpoints.length; i++) {
    const foundCheckpoint = await Checkpoint.findById(checkpoints[i].id);
    await foundCheckpoint.setRaid(raid);
  }
};

const setItemsToRaid = async (items, raid) => {
  for (let i = 0; i < items.length; i++) {
    const item = await Item.findById(items[i].id);
    if (item) await raid.addItem(item);
    if (item) await item.setRaidAcquired(raid);
  }
};
