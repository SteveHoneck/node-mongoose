//Define the schema and model for all documents in the databases campsites collection

const mongoose = require('mongoose'); //Import 'mongoose'
const Schema = mongoose.Schema; //THis line makes a shorthand to the "mongoose.Schema" function so it can be referred to as just "Schema"

const commentSchema = new Schema({ //New Schema which will be used for documents storing comments about a campsite.
    rating: {
        type: Number,
        min: 1, //min, max are able to be set if type is "Number"
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


//Create the schema
const campsiteSchema = new Schema({ //This creates a new object named "campsiteSchema", provide the schema with 2 arguments 
    //1st argument is required, it is an object that contains the definition for the schema via the object properties
    name: { //First property for this schema will be "name" with type string
        type: String,
        required: true, //Document will require a name
        unique: true //No 2 documents in this collection will have the same "name" field
    },
    description: { //2nd property 
        type: String, //will be type string
        required: true// will be required
    },
    comments: [commentSchema] //Add "commentSchema" as a sub-document. Putting it in an array will cause every campsite document to be able to contain multiple comment documents stored within an array
}, { //2nd argument is optional which sets various configuration options
    timestamps: true //cause mongoose automatically add 2 properties to this schema called "createdAt" and "updatedAt", which will be managed by Mongoose. When a document is created by the schema, it will be given the "createdAt" and "updateAt", whenever it's updated, "updatedAt" will be updated by Mongoose.
});

const Campsite = mongoose.model('Campsite', campsiteSchema); //Create a model using the above schema called "Campsite", 1st argument is a capilitized and singular version of the name of the collection we want to use for the Model. We want to use for the collection called "Campsites" so Mongoose will automatically look for 'campsites' for the collection. 2nd argument is the schema you want to use for this collection. This method returns a constructor function for its return value. This model will be used to create new instances of documents for MongoDB

module.exports = Campsite;