const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

//const mongoURI =
//'mongodb+srv:/mongodb+srv:/quiz2:123@cluster0.sb5kqqa.mongodb.net/Summer24';



// Create a Schema object
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  myName: { type: String },
  mySID: { type: String }
});

// Create a Model object
const Student = mongoose.model("s24students", studentSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
    // get the data from the form
    const mongoURI = req.body.myuri; // Capture the submitted MongoDB URI
    console.log("Received MongoDB URI: ", mongoURI); 
 

  // connect to the database and log the connection
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // add the data to the database
    const myName = "Bianca Barbosa Zanol de Oliveira";
    const mySID = "300347715";

    const newStudent = new Student({
      myName,
      mySID,
    });

    await newStudent.save();
    // send a response to the user
    res.send(`<h1>Document Added</h1>`);
  } catch (err) {
    console.error("Error:", err);
    res.status(400).send("Error: " + err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});




