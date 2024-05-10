//Reference Code: https://www.youtube.com/watch?v=ZhqOp1Dkuso&t=520s&ab_channel=MarinaKim - This helped me understand the basic concepts of how I could establish a connection between my HTML form and the MongoDB database, while I also made my own changes and implementations for it to suit my project as well as implementing appropriate error handling
const MongoClient = require ('mongodb').MongoClient; //This allows for the use of MongoDB services in the application
const express = require("express"); //Express provides the methods necessary for communication between my application and the database by means of HTTP utility methods.
const app = express() //declares express() as a variable so it is usable within the backend.
const mongoose = require("mongoose"); //Mongoose is MongoDB’s means of Object Data Modelling. Its job is to make communication between the Node app and the database by managing relationships between data as well as providing schema validation.
const bodyParser = require("body-parser"); //This is used to filter of the body of contents from an inbound HTTP request.
const now = new Date(); // https://www.w3schools.com/js/js_dates.asp
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString();
const mongoAtlasURL = process.env.MONGO_URL || "mongodb+srv://boylankian104:4Un6tMqCvvCGMVQj@cluster0.met6kej.mongodb.net/answer_log_db?retryWrites=true&w=majority&appName=Cluster0"
module.exports = app;

app.use(bodyParser.urlencoded({extended: true})) //This parses request bodies in URL-encoded format, allowing for the processing of data from HTML forms that are being submitted.
mongoose.connect(mongoAtlasURL); //This establishes a connection to the database I have designated to store logs.
const db = mongoose.connection //This is the connection between our server file and the MongoDB Atlas database
app.listen(3000, function(res, req){ //This sets up a localhost connection on port 1000.
    console.log("Server's Running || Connection to the database has also been established"); //Once a successful connection has been established, the console will display this message to show that the server is running.
});

db.on('error', (error) => { //If an error has occurred in connecting to the database, it will be displayed here
    console.log("There has been an error connecting to the database. Please see here: "+ error)
})


//Within the '[logs]' collection, it stores the documents in this format. These variables are declared within the logs schema, so when they are called, they are saved as a string format.
const logsSchema = {
    input: String,
    reply: String,
    input0: String,
    reply0: String,
    input1: String,
    date: String
}

const Log = mongoose.model("Log", logsSchema); //This converts the logsSchema into a model

//These 'GET' methods enable navigation between the HTML pages that are in the directory that they are saved in. This allows for navigation between them when the server they are on is running.
app.get("/", function(req, res){
    res.sendFile(__dirname + "/popup.html");
})

app.get("/privacy.html", function(req, res){
    res.sendFile(__dirname + "/privacy.html");
})

app.get("/about.html", function(req, res){
    res.sendFile(__dirname + "/about.html");
})

//This post request takes the data that was in the corresponding form fields and stores them to my database with assigned names such as "input" and "reply"
app.post("/", (req, res) =>{ 
    //https://www.w3schools.com/js/js_errors.asp - As a means of testing, I wanted to test for errors related to adding records to the database
    try{ 
    let newLog = new Log({
        input: req.body.input1,
        reply: req.body.reply0,
        input0: req.body.input0,
        reply0: req.body.reply,
        date: new Date()

    })
    newLog.save(); //Saves log to database
    res.redirect('/') //Once the log has been successfully saved, it redirects the user to the main page
    console.log("Interaction has successfully saved to database at " + `${time}` + " on " + `${date}`); //Informs the user that their log has successfully saved as well as the current time & date

    }catch(err){ //I wanted to implement a try-catch method for error handling purposes. If there has been an error where the user is unable to save their record somehow, an error is thrown. Otherwise, the try method will run to completion and display the appropriate log message(s)
        console.log("Saving of record was not successful due to the following error: " + err);
    }
})
 