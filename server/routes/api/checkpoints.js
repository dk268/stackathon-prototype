const { User, Raid, Checkpoint, Op, Character } = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/checkpoints/

router.get("/", async (req, res, next) => {
  const allCheckpoints = await Checkpoint.findAll({
    include: [Character, Raid],
  });
  res.json(allCheckpoints);
});

router.get("/:checkpointId", async (req, res, next) => {
  const oneCheckpoint = await Checkpoint.findById(req.params.checkpointId, {
    include: [Character, Raid],
  });
  res.json(oneCheckpoint);
});

router.post("/", async (req, res, next) => {
  try {
    const newCheckpoint = await Checkpoint.create(req.body);
    if (req.body.raid && req.body.raid.id)
      await setCheckpointToRaid(req.body.raid, newCheckpoint);
    if (req.body.characters.length)
      await setCharactersToCheckpoint(req.body.checkpoints, newCheckpoint);
    res.json(newCheckpoint);
  } catch (e) {
    next(e);
  }
});

router.put("/:checkpointId", async (req, res, next) => {
  try {
    const [, updatedCheckpoint] = await Checkpoint.update(req.body, {
      where: {
        id: req.params.checkpointId,
      },
      returning: true,
      plain: true,
    });
    await setCheckpointToRaid(req.body.raid, updatedCheckpoint);
    await setCharactersToCheckpoint(req.body.characters, updatedCheckpoint);
    res.json(updatedCheckpoint);
  } catch (e) {
    next(e);
  }
});

router.delete("/:checkpointId", async (req, res, next) => {
  try {
    await Checkpoint.destroy({ where: { id: req.params.checkpointId } });
    const remainingCheckpoints = await Checkpoint.findAll();
    res.json(remainingCheckpoints);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

const setCheckpointToRaid = async (raid, checkpoint) => {
  if (raid && raid.id) {
    const foundRaid = await Raid.findById(raid.id);
    await checkpoint.setRaid(foundRaid);
  } else await checkpoint.setRaid(null);
};
const setCharactersToCheckpoint = async (characters, checkpoint) => {
  try {
    const foundCharacters = await Character.findAll({
      where: {
        characterName: {
          [Op.in]: characters.map(c => c.characterName),
        },
      },
    });
    await checkpoint.setCharacters(foundCharacters);
  } catch (e) {
    console.log(e);
  }
};
