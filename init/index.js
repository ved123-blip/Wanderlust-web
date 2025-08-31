const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


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

const initDB = async ()=>{
  await Listing.deleteMany({});
initData.data = initData.data.map((obj)=> ({...obj,owner: "68b023d8f35b30d3c303ee8e"}));
  await Listing.insertMany(initData.data);
  console.log("data waws initialized!");
}
initDB();