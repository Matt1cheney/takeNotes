// dependencies
// ================================================================
const express = require("express");
const path = require("path");
//express app setup
// ================================================================
const app = express();
const PORT = 8080;

// sets up the express app
// ================================================================

app.use(express.static('public'))

// routes to the html pages
// ================================================================
app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "index.html"));
  return res.send("some random string")
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"notes.html"));
});

app.listen(PORT, () => {
  console.log("listening on port https://localhost:" + PORT);
});
