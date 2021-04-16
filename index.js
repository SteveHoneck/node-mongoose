//Create a Node Application that uses Mongoose and the model & schema from "campsite.js"


const mongoose = require('mongoose');
const Campsite = require('./models/campsite'); //Require the Campsite model as "Campsite"

const url = 'mongodb://localhost:27017/nucampsite'; //shortcut for URL of the MongoDB server. This URL will automatically connect us to the "nucampsite" database in the MongoDB server
const connect = mongoose.connect(url, { //1st argument is the URL of the database
    //2nd argument is an object to set options, being set to deal with some depracation warnings
    useCreateIndex: true,
    useFindAndModify: false, 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


//Create a new document based on the Mongoose model named Campsite, then save that document which automatically saves to the Campsites collection in the DB, then console log that saved document, find and log all documents made from the Campsite model, then delet all the documents created from the Campsite model then close the connection. Done with the promise chain so any errors are caught at the bottom and all operations happen in sequence (not asynchronous).

connect.then(() => { //the "mongoose.connect" method returns a promise, so a ".then" method can be chained to it. 

    console.log('Connected correctly to server'); //inside the function for the then method, console log that we connected to the server

    Campsite.create({ //".create" is a method available on the model (as opposed to using "new Campsite") which takes an object which defines the new document to create, then automatically saves it. It returns a promise that resolves to the new document
        name: 'React Lake Campground',
        description: 'test'
    })

    .then(campsite => { //Takes the resolved promise from ".create" and names it "campsite", passes it to the console.log to show what has been made and saved
        console.log(campsite);
        //update the campsite itself. 
        return Campsite.findByIdAndUpdate(campsite._id, { //Give 3 arguments, the document's ID 
            $set: { description: 'Updated Test Document' } //2nd argument an object with the update operator ($set) and specify what field to change, 
        }, {
            new: true //3rd argument set option of "new: true" which will cause the method to return the updated document (the default is to return the original document before it was updated)
        });
    })
    .then(campsite => { //Promise from "findByIdAndUpdate" resolves into a campsite document and is assigned to "campsite"
        console.log(campsite);

        campsite.comments.push({ //Comments subdocuments are stored in the Campsite document as an array, so can use "push" and pass it an object that defines the subdocument.
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save(); //Return the "campsite.save()" method in order for the subdocument update to take affect, it will return the campsite that was saved with the new Comments sub document
    })
    .then(campsite => { //takes the single campsite document resolved from "campsite.save()" 
        console.log(campsite);
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