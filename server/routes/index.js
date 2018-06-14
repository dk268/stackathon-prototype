const express = require("express");
const router = express.Router();
const path = require("path");

router.use("/api", require("./api/index.js"));
router.use("/users", require("./api/users.js"));
// app.use("/ROUTENAME", require("./routes/ROUTENEAME"));

router.get("*", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  res.sendFile(path.join(__dirname, "../../public/index.html"));
}); // Send index.html for any other requests

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
