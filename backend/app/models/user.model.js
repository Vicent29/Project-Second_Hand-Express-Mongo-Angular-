var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

module.exports = mongoose => {

    var UserSchema = mongoose.Schema({
        username: String,
        email: String,
        bio: String,
        image: String,
        hash: String,
        salt: String,
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    }, { timestamps: true });

    UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

    UserSchema.methods.validPassword = function (password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    };

    UserSchema.methods.setPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

    UserSchema.methods.generateJWT = function () {
        var today = new Date();
        var exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000),
        }, secret);
    };

    UserSchema.methods.toAuthJSON = function () {
        return {
            username: this.username,
            email: this.email,
            token: this.generateJWT(),
            bio: this.bio,
            image: this.image
        };
    };

    UserSchema.methods.follow = function (id) {
        if (this.following.indexOf(id) === -1) {
            this.following.push(id);
        }

        return this.save();
    };

    UserSchema.methods.favorite = function (id) {
        if (this.favorites.indexOf(id) === -1) {
            this.favorites.push(id);
        }

        return this.save();
    };

    UserSchema.methods.unfavorite = function (id) {
        this.favorites.remove(id);
        return this.save();
    };

    UserSchema.methods.unfollow = function (id) {
        this.following.remove(id);
        return this.save();
    };

    UserSchema.methods.isFollowing = function (id) {
        return this.following.some(function (followId) {
            return followId.toString() === id.toString();
        });
    };

    UserSchema.methods.toProfileJSONFor = function (user) {
        return {
            username: this.username,
            email: this.email,
            bio: this.bio,
            image: this.image || 'https://avatars.dicebear.com/api/personas/' + this.username + '.svg',
            favorites: this.favorites,
            following: user,
            followers: this.followers,
            following: user ? user.isFollowing(this._id) : false
        };
    };

    const User = mongoose.model('user', UserSchema);
    return User;
};