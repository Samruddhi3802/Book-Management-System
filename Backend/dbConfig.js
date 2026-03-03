const mongoose=require("mongoose");
// require("dotenv").config();

const dbConnect=async ()=>{
    await mongoose.connect("mongodb+srv://Samruddhi:samruddhi1234@bookmgmt.voijuim.mongodb.net/?appName=BookMgmt")
    .then(()=>{
        console.log("Database connected successfully"); 
    })
    .catch((err)=>{
        console.log("Database connection failed");
    })
}

module.exports = dbConnect;