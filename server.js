const express = require("express"); // Import the express module
const app = express(); // Create express instance
const sqlite3 = require("sqlite3").verbose(); // Create SQLite instance
const db = require("./database/dbconnection")(sqlite3); // Create database connection using sqlite

const bodyParser = require("body-parser"); // Import the body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import Controllers
const homeController = require("./controllers/HomeController")(express);
app.use("/home", homeController);
const usersController = require("./controllers/UsersController")(db);
app.use("/users", usersController);

app.get("/", homeController, (req, res) => {
  res.send("Hello World");
});

const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Close the database connection when the server is closed
app.on("close", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
});
// Gracefully handle shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server is shut down.");
    process.exit(0);
  });
});
