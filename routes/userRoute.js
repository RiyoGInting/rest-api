const express = require("express"); // Import express
const router = express.Router(); // Make a router

// // Import validator
const userValidator = require("../middlewares/validators/userValidator");
// Import controller
const userController = require("../controllers/userController");

router.post("/register", userValidator.create, userController.create);

module.exports = router; // Export router
