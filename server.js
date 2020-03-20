// dependencies
// ================================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid/v4");

// import { v4 as uuidv4 } from 'uuid';
//express app setup
// ================================================================
const app = express();
const PORT = process.env.PORT || 8080;

// sets up the express app
// ================================================================

app.use(express.static("public"));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// define API routes
//=================================================================
//read
//grabbing our file
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, note) => {
    //err func

    if (err) {
      return res.status(500).send({ error: "sorry, I cant read" });
    }
    let returnVal = JSON.parse(note);
    //return data to client
    return res.json(returnVal);
  });
});

//update file
app.post("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, note) => {
    // err func
    if (err)
      return res
        .status(500)
        .send({ error: "something i cant read here either..." });
    //create a variable to write note
    let currentNote = JSON.parse(note);
    // give the note a unique ID
    req.body.id = uuidv4();
    // the incoming note
    let newBody = req.body;
    //push new note to array
    currentNote.push(newBody);

    //grab current note and new note, combine, then refill contents of db.json with updated array
    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(currentNote),
      err => {
        //if an error then return status code 500
        if (err) return res.status(500).send({ error: "something blew up" });

        //returns [object object]
        return res.json(currentNote);
      }
    );
  });
});
// will delete selected element
app.delete("/api/notes/:noteId", (req, res) => {
  //need to read file to specify which element
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, notes) => {
    if (err) return res.status(500).send({ error: "Unable to delete" });
    //parse our array of notes
    let parsedNote = JSON.parse(notes);
    //the note clicked
    const id = req.params.noteId;

    // function to filter out all of the notes to keep and leaving out the one not keeping.
    const filterednotes = parsedNote.filter(function(note) {
      if (note.id !== id) {
        return true;
      } else return false;
    });
    // rewrite out file without the unwanted note
    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(filterednotes),
      err => {
        //if an error then return status code 500
        if (err) return res.status(500).send({ error: "something blew up" });

        return res.json(filterednotes);
      }
    );
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
