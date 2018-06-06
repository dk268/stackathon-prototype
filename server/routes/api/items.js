const { User, Item, Raid, Character } = require("../../db/index.js");
const express = require("express");
const router = express.Router();

// /api/items/

router.get("/", async (req, res, next) => {
  console.log("hlloooo!!");
  const allItems = await Item.findAll({
    include: [Character, Raid, User]
  });
  res.json(allItems);
});

router.get("/:itemId", async (req, res, next) => {
  const oneItem = await Item.findById(req.params.itemId, {
    include: [Character, Raid, User]
  });
  res.json(oneItem);
});

router.post("/", async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (e) {
    next(e);
  }
});

router.put("/:itemId", async (req, res, next) => {
  try {
    const [, updatedItem] = await Item.update(req.body, {
      where: {
        id: itemId
      },
      returning: true,
      plain: true
    });
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
