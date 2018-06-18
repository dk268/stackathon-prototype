const express = require("express");
const router = express.Router();

// /api/

router.use("/characters", require("./characters.js"));
router.use("/items", require("./items.js"));
router.use("/raids", require("./raids.js"));
router.use("/checkpoints", require("./checkpoints.js"));

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
