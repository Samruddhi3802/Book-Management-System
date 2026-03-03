const express=require("express");
const router=express.Router();
const {handleBookController}=require("../controller/bookController");

router.get("/", (req, res)=>{
    res.send("Book Route is working successfully");
})

//adding book
router.post("/add", handleBookController)

module.exports=router;