const express = require("express"); // Import express
const router = express.Router(); // Make a router

// // Import validator

// Import controller
const taskController = require("../controllers/taskController");

router.post("/assign", taskController.create);
router.get("/list/:email", taskController.getAll);
router.post("/unassign", taskController.delete);
router.post("/common", taskController.commonTasks);

module.exports = router; // Export router
