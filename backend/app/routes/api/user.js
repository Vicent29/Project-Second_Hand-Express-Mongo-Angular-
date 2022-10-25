var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('user');
var auth = require('../auth');

router.get('/', auth.required, function (req, res, next) {
  User.findById(req.auth.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return res.json({ user: user.toAuthJSON() });
  }).catch(next);
});

router.post('/register', function (req, res, next) {

  let prueba = User.find({ "email": req.body.user.email })
    .then(function (data) {
      if (data == '') {
        var user = new User();

        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);


        user.save().then(function () {
          return res.json(user.toAuthJSON());
        }).catch(next);
      } else {
        return res.json(401, {msg: "emailnotavailable" })
      }
    })
});

router.post('/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }
  user = req.body.user;
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json(user.toAuthJSON());
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.put('/', auth.required, function (req, res, next) {
  console.log(req.body.user);
  User.findById(req.auth.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.body.user.username != "") {
      user.username = req.body.user.username;
    }
    if (req.body.user.email != "") {
      user.email = req.body.user.email;
    }
    if (req.body.user.bio != "") {
      user.bio = req.body.user.bio;
    }
    if (req.body.user.image != "") {
      user.image = req.body.user.image;
    }
    if (req.body.user.password != "") {
      console.log("cambio");
      console.log(req.body.user.password);
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({ user: user.toAuthJSON() });
    });
  }).catch(next);
});

module.exports = router;
