const express=require("express");
const router=express.Router();
const {addBookController, getBookController, getOneBookController, 
    deleteOneBookController, updateOneBookController}=require("../controller/bookController");

router.get("/", (req, res)=>{
    res.send("Book Route is working successfully");
})

//adding book
router.post("/add", addBookController)

//geting all books
router.get("/getbooks", getBookController)

//getting one book
router.get("/getonebook", getOneBookController)

//deleting one book
router.delete("/deleteonebook", deleteOneBookController)

//updating one book
router.put("/updateonebook", updateOneBookController)

module.exports=router;