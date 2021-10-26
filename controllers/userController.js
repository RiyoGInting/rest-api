const express = require("express");
const models = require("../models"); // Import models

class UserController {
  // create a new user
  async create(req, res) {
    try {
      let users = req.body.users;
      for (let user of users) {
        await models.User.create({
          email: user,
        });
      }

      // If success send data as response
      return res.status(204).send();
    } catch (error) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
