const book=require("../model/book");

const addBookController=async (req, res)=>{
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
        message:err.message
    })
 }
}

const getBookController=async (req, res)=>{
    try{
       const bookData=await book.find({});
       if(bookData){
        return res.status(200).json({
            success:true,
            message:"Books fetched successfully",
            bookData,
            totalBooks:bookData.length
        })
       }
       return res.status(400).json({
        success:false,
        message:"Books not Found..."
       })
    }
    catch(err){
      return res.status(500).json({
        success:false,
        message:err.message
      })
    }
}

const getOneBookController=async(req, res)=>{
  try{
    let data=req.body;
    let bookData=await book.findOne({_id:data.id});
    if(bookData){
        return res.status(200).json({
            success:true,
            message:"Book fetched successfully",
            bookData
        })
    }
    return res.status(400).json({
        success:false,
        message:"Book not Found..."
    })
  }
  catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
      })
  }
}

const deleteOneBookController=async(req, res)=>{
    try{
      let data=req.body;
      let response=await book.deleteOne({_id:data.id});
      if(response.deletedCount>0){
        return res.status(200).json({
            success:true,
            message:"Book deleted successfully"
        })
      }
      return res.status(400).json({
        success:false,
        message:"Book not Found..."
      })
    }
    catch(err){
        return res.status(500).json({
        success:false,
        message:err.message
      })
    }
}

const updateOneBookController=async(req, res)=>{
    try {
        let data=req.body;
        let response=await book.updateOne({_id:data.id},{
            $set:{
                bookTitle:data.bookTitle,
                bookAuthor:data.bookAuthor,
                publishDate:data.publishDate,
                Price:data.Price,
                Description:data.Description
            }
        })
        if(response.modifiedCount>0){
            res.status(200).json({
                success:true,
                message:"Book updated successfully",
            })
        }
        return res.status(400).json({
            success:false,
            message:"Book not Found..."
        })
    } catch (error) {
        return res.status(500).json({
        success:false,
        message:err.message
      })
    }

}

module.exports={addBookController, getBookController, getOneBookController, deleteOneBookController, updateOneBookController}