const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const dbConnect=async ()=>{
    await mongoose.connect(process.env.MONGOURI)
    .then(()=>{
        console.log("Database connected successfully"); 
    })
    .catch((err)=>{
        console.log("Database connection failed");
    })
}

module.exports = dbConnect;