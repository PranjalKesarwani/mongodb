const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
//connection and creation of new database
mongoose.connect("mongodb://localhost:27017/ttchannel").then( ()=>{
    console.log("connection successful...");
}).catch( (err)=>{
    console.log(err);
}) //This returns promise, so it will take some time to return it