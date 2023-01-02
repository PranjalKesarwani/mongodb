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
        required: true,
        unique:true,
        lowercase:true,
        trim: true,
        minlength:2,
        maxlength:20
    },
    ctype:{
        type:String,
        lowercase: true,
        enum:["frontend","backend","database"]
    },
    videos: {
        type:Number,
        validator(value){
            if(value.length<0){
                throw new Error("number of videos should be positive");
            }
        }
    },
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
        // const jsPlaylist = new Playlist({
        //     name: "javascript",
        //     ctype: "Front-End",
        //     videos: 150,
        //     author: "Thapa Technical",
        //     active: true,
           
        // })
        // const mongoPlaylist = new Playlist({
        //     name: "Node JS",
        //     ctype: "Database",
        //     videos: 10,
        //     author: "Thapa Technical",
        //     active: true,
           
        // })
        // const expressPlaylist = new Playlist({
        //     name: "Express JS",
        //     ctype: "Back-End",
        //     videos: 20,
        //     author: "Thapa Technical",
        //     active: true,
           
        // })
        const cssPlaylist = new Playlist({
            name: "GoLang",
            ctype: "frontEnd",
            videos: 4,
            author: "Thapa Technical",
            active: true,
           
        })

        // const result=await reactPlaylist.save();
        const result=await Playlist.insertMany([cssPlaylist]);

        console.log(result);

    } catch (error) {
        console.log(error);
    }
}

createDocument();


// const result=await reactPlaylist.save(); //ye .save() method promise return krta hai so isme async await use kr sakte ho, maine mongoose connect krte waqt use ni kiya but ab harr jagah use krege


const getDocument = async ()=>{
    

    try {
        const result = await Playlist
        .find({author:"Thapa Technical"})
        .select({name:1})
        .sort({name:-1});
        // .limit(1);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
        

   
}

// getDocument();

const updateDocument = async (_id)=>{
    try {
        
      const res = await Playlist.findByIdAndUpdate({_id},{$set:{name:"JavaScript"}},{new: true});
      console.log(res);


    } catch (error) {
        console.log(error);
    }
}

// updateDocument('63b2ea183f889522dd6f1d7d');

//deleting the documents


const deleteDocument = async (_id)=>{
    try {
        const res = await Playlist.findByIdAndDelete({_id});
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

// deleteDocument("63b2c1624369ed691ba34882");
