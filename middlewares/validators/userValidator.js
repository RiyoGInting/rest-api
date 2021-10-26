const models = require("../../models");
const validator = require("validator"); // Import validator

exports.create = async (req, res, next) => {
  try {
    let users = req.body.users;
    let errors = [];
    for (let user of users) {
      if (!validator.isEmail(user)) {
        errors.push("Please insert a valid email");
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    let findData = await models.User.findOne({
      where: { email: req.body.users },
    });

    if (findData) {
      return res.status(400).json({
        message: `User has already created`,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
