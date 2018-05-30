const express = require("express");
const router = express();

// /users/

router.get("/me", (req, res, next) => {
  res.json(req.user);
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) res.status(401).send("User not found");
    else if (!user.hasMatchingPassword(req.body.password))
      //probably need to put this instance method on User class
      res.status(401).send("Incorrect password");
    else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.login(user);
  } catch (e) {
    next(e);
  }
});

router.post("/logout", (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
