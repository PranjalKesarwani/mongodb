const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
//connection and creation of new database
mongoose.connect("mongodb://localhost:27017/ttchannel").then( ()=>{
    console.log("connection successful...");
}).catch( (err)=>{
    console.log(err);
}) //This returns promise, so it will take some time to return it

//schema
//A mongoose schema defines the structure of the document, default values, validators, etc.

const playlistSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date:{
        type: Date,
        default: Date.now
    }
})

/*
A mongoose model is a wrapper on the mongoose schema. A mongoose schema defines the strucure of the document, default values, validators, etc. , whereas a Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
*/

//now we are defining the class, it is model
const Playlist = new mongoose.model("Playlist", playlistSchema); //Playlist is in Pascalcase  and inside parenthesis P should be capital and when you will see in compass this Playlist will be shown as playlists


//creation and insertion of document


const createDocument = async ()=>{
    try {
        const reactPlaylist = new Playlist({
            name: "Node JS",
            ctype: "Back-End",
            videos: 50,
            author: "Thapa Technical",
            active: true,
           
        })

        const result=await reactPlaylist.save();

        console.log(result);

    } catch (error) {
        console.log(error);
    }
}

createDocument();


// const result=await reactPlaylist.save(); //ye .save() method promise return krta hai so isme async await use kr sakte ho, maine mongoose connect krte waqt use ni kiya but ab harr jagah use krege
