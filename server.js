// dependencies
// ================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const bodyParser = require("body-parser");
//express app setup
// ================================================================
const app = express();
const PORT = 3307;

// sets up the express app
// ================================================================

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));
const jsonParser = bodyParser.json()

// define API routes
//=================================================================
//read
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, note) => {
    //err func
    console.log(JSON.parse(note), "current notes")
    
    if (err) { return res.status(500).send({ error: "sorry, I cant read" });
  }
  let returnVal = JSON.parse(note);
    //return data to client
    return res.json(returnVal)
  });
});

//update
app.post("/api/notes", jsonParser, (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, note) => {
    
    if (err)
      return res
        .status(500)
        .send({ error: "something i cant read here either..." });
    //create a variable to write note
    let currentNote = JSON.parse(note); 
    let newBody = req.body;
    //push new note to array
    currentNote.push(newBody);
    //grab current note and new note, combine, then refill contents of db.json with updated array
    fs.writeFile(path.join(__dirname, "db", "db.json"), currentNote, (err) => {
      //if an error then return status code 500
      if (err) return res.status(500).send({ error: "something blew up" });
      let finalNote= JSON.parse(currentNote);
      console.log(finalNote)
      //returns [object object]
      return res.json(finalNote);
    });
    // console.log(`the ${JSON.parse(_data)} was written to the file!`);
  });
});

// routes to the html pages
// ================================================================
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", (req, res) => {
  return res.sendFile(path.join(__dirname, "notes.html"));
});

app.listen(PORT, () => {
  console.log("listening on port http://localhost:" + PORT);
});
