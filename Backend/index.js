const express=require("express");
const dbConnect=require("./dbConfig");
const router=require("./routes/bookRoute")

const port=8000;

const app=express();
app.use(express.json());

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})

app.get("/", (req, res)=>{
    res.send("Backend Server is running successfully");
})

app.use("/api/book", router);

dbConnect();