const express=require("express");
const dbConnect=require("./dbConfig");
const cors=require("cors");
const router=require("./routes/bookRoute")
const dotenv=require("dotenv");

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors())

const port=process.env.PORT || 8000;

app.get("/", (req, res)=>{
    res.send("Backend Server is running successfully");
})

app.use("/api/book", router);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})

dbConnect();