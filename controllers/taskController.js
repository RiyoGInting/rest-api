const express = require("express");
const models = require("../models"); // Import models

class TaskController {
  // create a new user
  async create(req, res) {
    try {
      // find user
      let user = await models.User.findOne({ where: { email: req.body.user } });
      if (!user) {
        return res.status(400).json({
          message: `User not exist`,
        });
      }

      let id_user = user.dataValues.id;
      let tasks = req.body.tasks;
      for (let task of tasks) {
        await models.Task.create({
          id_user: id_user,
          name: task,
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

  // Get all user's task list
  async getAll(req, res) {
    try {
      let user = await models.User.findOne({
        where: { email: req.params.email },
      });
      if (!user) {
        return res.status(400).json({
          message: `User not exist`,
        });
      }

      let id = user.dataValues.id;
      let data = await models.Task.findAll({ where: { id_user: id } });

      // If data does not exist
      if (data.length === 0) {
        return res.status(404).json({
          message: "Data Not Found",
        });
      }

      // If success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // Delete task
  async delete(req, res) {
    try {
      console.log(req.body);
      let user = await models.User.findOne({ where: { email: req.body.user } });
      let idUser = user.dataValues.id;

      let tasks = req.body.tasks;
      for (let task of tasks) {
        await models.Task.destroy({ where: { id_user: idUser, name: task } });
      }

      // If successful
      return res.status(204).send();
    } catch (error) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  // common tasks
  async commonTasks(req, res) {
    try {
      let user1 = await models.User.findOne({
        where: { email: req.body.users[0] },
      });
      let user2 = await models.User.findOne({
        where: { email: req.body.users[1] },
      });

      let task1 = await models.Task.findAll({
        where: { id_user: user1.dataValues.id },
        attributes: ["name"],
        raw: true,
      });
      let task2 = await models.Task.findAll({
        where: { id_user: user2.dataValues.id },
        attributes: ["name"],
        raw: true,
      });

      let tasks = [];
      for (let task of task1) {
        task2.find(function (data, index) {
          if (data.name === task.name) {
            tasks.push(data.name);
          }
        });
      }

      // If successful
      return res.status(200).json({
        tasks: tasks,
      });
    } catch (error) {
      // If error
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}

module.exports = new TaskController();
