var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("user");
var auth = require("../auth");

router.param("email", function (req, res, next, email) {
  User.findOne({ email: email })
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }

      req.profile = user;

      return next();
    })
    .catch(next);
});

router.get("/", auth.required, function (req, res, next) {
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.get("/follows", auth.required, function (req, res, next) {
  User.findOne({ _id: req.auth.id }).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    }

    User.find({ _id: user.following }).then(function (users) {
      return res.json(users);
    })
  }).catch(next);
});

router.get("/count/:email", auth.optional, function (req, res, next) {
return res.json({ followers: req.profile.followers.length, following: req.profile.following.length })
})



router.get("/:email", auth.required, function (req, res, next) {
  User.findById(req.profile.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.post("/:email/follow", auth.required, function (req, res, next) {
  var profileId = req.profile.id;

  if (req.auth.id != req.profile.id) {
    User.findById(req.auth.id)
      .then(function (user) {
        if (!user) {
          return res.sendStatus(401);
        }

        req.profile.newfollower(req.auth.id)
        return user.follow(profileId).then(function () {
          return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
      })
      .catch(next);
  }
});

router.delete("/:email/follow", auth.required, function (req, res, next) {
  var profileId = req.profile._id;

  if (req.auth.id != req.profile.id) {
    User.findById(req.auth.id)
      .then(function (user) {
        if (!user) {
          return res.sendStatus(401);
        }

        req.profile.delfollower(req.auth.id)
        return user.unfollow(profileId).then(function () {
          return res.json({ profile: req.profile.toProfileJSONFor(user) });
        });
      })
      .catch(next);
  }
});

module.exports = router;
