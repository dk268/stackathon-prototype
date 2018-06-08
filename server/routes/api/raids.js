const {
  User,
  Item,
  Raid,
  Character,
  Checkpoint,
} = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/raids/

router.get("/", async (req, res, next) => {
  console.log("/api/raids reached");
  const allRaids = await Raid.findAll({
    include: [Item, Character, Checkpoint],
  });
  res.json(allRaids);
});

router.get("/:raidId", async (req, res, next) => {
  const oneRaid = await Item.findById(req.params.raidId, {
    include: [Item, Character, Checkpoint],
  });
  res.json(oneRaid);
});

router.post("/", async (req, res, next) => {
  try {
    const newRaid = await Raid.create(req.body);
    res.json(newRaid);
  } catch (e) {
    next(e);
  }
});

router.put("/:raidId", async (req, res, next) => {
  try {
    const [, updatedRaid] = await Raid.update(req.body, {
      where: {
        id: raidId,
      },
      returning: true,
      plain: true,
    });
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
