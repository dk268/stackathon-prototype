const express = require("express");
const router = express();

// /api/
console.log("/api reached");

router.use("/characters", require("./characters.js"));

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
