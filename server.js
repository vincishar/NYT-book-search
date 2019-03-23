const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const apiRoutes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => {
    console.log("Connected to Database");

    // Define middleware here
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Serve up static assets (usually on heroku)
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(__dirname + "/client/build"));
    }

    // Define API routes here
    app.use("/api", apiRoutes);

    // Send every other request to the React app
    // Define any API routes before this runs
    if (process.env.NODE_ENV === "production") {
      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/client/build/index.html"));
      });
    }

    app.listen(PORT, () => {
      console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
  })
  .catch(err => console.log("err connecting to DB"));
