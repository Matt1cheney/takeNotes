// dependencies
// ================================================================
const express = require("express");
const path = require("path");
//express app setup
// ================================================================
const app = express();
const PORT = 3307;

// sets up the express app
// ================================================================

app.use(express.static('public'))

// routes to the html pages
// ================================================================
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));

});
app.get("/notes", (req, res) => {
  return res.sendFile(path.join(__dirname,"notes.html"));
});

app.listen(PORT, () => {
  console.log("listening on port http://localhost:" + PORT);
});
