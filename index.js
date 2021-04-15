//Create a Node Application that uses Mongoose and the model & schema from "campsite.js"


const mongoose = require('mongoose');
const Campsite = require('./models/campsite'); //Require the Campsite model as "Campsite"

const url = 'mongodb://localhost:27017/nucampsite'; //shortcut for URL of the MongoDB server. This URL will automatically connect us to the "nucampsite" database in the MongoDB server
const connect = mongoose.connect(url, { //1st argument is the URL of the database
    //2nd argument is an object to set options, being set to deal with some depracation warnings
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//Create a new document based on the Mongoose model named Campsite, then save that document which automatically saves to the Campsites collection in the DB, then console log that saved document, find and log all documents made from the Campsite model, then delet all the documents created from the Campsite model then close the connection. Done with the promise chain so any errors are caught at the bottom and all operations happen in sequence (not asynchronous).

connect.then(() => { //the "mongoose.connect" method returns a promise, so a ".then" method can be chained to it. 

    console.log('Connected correctly to server'); //inside the function for the then method, console log that we connected to the server

    const newCampsite = new Campsite({ //Make a new document, the "Campsite" with the capital C is the model that we are extracting from, pass an object that sets the documents fields
        name: 'React Lake Campground',
        description: 'test'
    });

    newCampsite.save() //use the save method (Mongoose method that will save the document to the database) on the new document, will return a promise that says wheter the save failed or succeeded. If success, the promise will resolve with the saved campsite.
    .then(campsite => { //Takes the resolved promise from ".save" and names it "campsite", passes it to the console.log to show what has been saved
        console.log(campsite);
        return Campsite.find(); //use ".find" with capital C (referrs to the Model), to look for all documents that are based on the Campsite model, return the result as a promise which if successful will return the found documents inside an array of objects.
    })
    .then(campsites => { //take the array of objects from ".find" and console.log it
        console.log(campsites);
        return Campsite.deleteMany(); //call the "deleteMany" method on all documents that use the "Campsite" model
    })
    .then(() => { //Close the connection
        return mongoose.connection.close();
    })
    .catch(err => { //Catch any errors for the promise chain
        console.log(err); //console log the error message
        mongoose.connection.close(); //close the connection if there is an error
    });
});