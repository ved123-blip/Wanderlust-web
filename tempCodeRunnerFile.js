const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db!");
})                             //connection with database
.catch((err)=>{
console.log(err);
})



//set up database with mongodb provided  links of databases
async function main(){
    await mongoose.connect(MONGO_URL);
}


// we have created api to check if server is working or not 
app.get("/",(req, res)=>{
    res.send("hiii i am root!");  
});

app.get("/testListing", async (req,res)=>{
    let sampleListing = new Listing({
    title: "My new Villa",
    description:"By the beach",
    price: 1200,
    location:"Calanguate, Goa",
    country: "India",
});

await sampleListing.save();
console.log("Listing was saved");
res.send("successful testing");
});



//here we have created server port locahost 8080
app.listen(8080,()=>{
    console.log("server is listening to port 8080!");
});   