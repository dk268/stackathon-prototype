const express = require("express");
const router = express.Router();
const path = require("path");

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
}); // Send index.html for any other requests

router.use("/api", require("./api/index.js"));
// app.use("/ROUTENAME", require("./routes/ROUTENEAME"));

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
