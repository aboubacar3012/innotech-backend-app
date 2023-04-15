const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Registration
router.post("/signup", (request, response) => {
  try {
    const body = request.body;
    // check if user exist
    User.findOne({ email: body.email }).then((user) => {
      // if exist return error message
      if (user) {
        return response
          .status(200)
          .json({ success: false, error: "Cet utilisateur exist deja" });
      }
      // if not exist create new user
      else {
        const hashedPassword = bcrypt.hashSync(body.password, saltRounds);
        body.password = hashedPassword;
        const newUser = new User({
          ...body,
        });
        newUser.save().then((user) => {
          return response.status(201).json({
            success: true,
            message: "User created successfully",
            user: user,
          });
        });
      }
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

// Login
router.post("/signin", (request, response) => {
  try {
    const { email, password } = request.body;
    // check if user exist
    User.findOne({ email: email }).then((user) => {
      // if exist return user
      if (user && bcrypt.compareSync(password, user.password)) {
        delete user.password;
        return response.status(200).json({ success: true, user: user });
      }
      // if not exist create new user
      else {
        return response
          .status(201)
          .json({ success: false, message: "email or password incorrect" });
      }
    });
  } catch (e) {
    return response.status(200).json({ success: false, error: e.message });
  }
});

module.exports = router;
