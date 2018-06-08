const { User, Item, Checkpoint, Character } = require('../../db/index.js');
const express = require('express');
const router = express.Router();

// /api/checkpoints/

router.get('/', async (req, res, next) => {
  console.log('/api/checkpoints reached');
  const allCheckpoints = await Checkpoint.findAll({
    include: [Item, Character, Checkpoint],
  });
  res.json(allCheckpoints);
});

router.get('/:checkpointId', async (req, res, next) => {
  const oneCheckpoint = await Item.findById(req.params.checkpointId, {
    include: [Item, Character, Checkpoint],
  });
  res.json(oneCheckpoint);
});

router.post('/', async (req, res, next) => {
  try {
    const newCheckpoint = await Checkpoint.create(req.body);
    res.json(newCheckpoint);
  } catch (e) {
    next(e);
  }
});

router.put('/:checkpointId', async (req, res, next) => {
  try {
    const [, updatedCheckpoint] = await Checkpoint.update(req.body, {
      where: {
        id: checkpointId,
      },
      returning: true,
      plain: true,
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/:checkpointId', async (req, res, next) => {
  try {
    await Checkpoint.destroy({ where: { id: req.params.checkpointId } });
    const remainingCheckpoints = await Checkpoint.findAll();
    res.json(remainingCheckpoints);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
