const express = require("express");
const router = express();

router.use("/api", require("./api/index.js"));
// app.use("/ROUTENAME", require("./routes/ROUTENEAME"));

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
