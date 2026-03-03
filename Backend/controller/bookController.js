const book=require("../model/book");

const handleBookController=async (req, res)=>{
 try{
   const data=req.body;

   if(!data.bookTitle || !data.bookAuthor || !data.publishDate || !data.Price)
   {
    return res.status(400).json({
        success:false,
        message:"Please fill all the fields"
    })
   }

   console.log(data);

   const bookData=await book.insertOne(data);
   if(bookData)
   {
    return res.status(200).json({
        success:true,
        message:"Book added successfully"
    })
   }

 }
 catch(err)
 {
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
 }
}

module.exports={handleBookController}