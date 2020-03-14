// dependencies
// ================================================================
const express = require("express");
//express app setup
// ================================================================
const app= express();
const PORT = 8080;;

// sets up the express app to anlde data parsing
// ================================================================
app.use(express.static('takeNotes' + 'assets/css' + 'assets/js'))


app.listen(PORT, ()=> {
  console.log("listening on port https://localhost:8080"+ PORT)
})