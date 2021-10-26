require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const app = express();

//Set body parser for HTTP post request
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import routes
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

require("dotenv").config();
const port = process.env.APP_PORT || 3000;

// app.use
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);

app.listen(port, () => console.log("Server running..."));
