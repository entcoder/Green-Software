import mongoose from 'mongoose'
import { ApiError } from '../utills/ApiError.js'
import { ApiResponse } from '../utills/ApiResponse.js'
import { asyncHandler } from '../utills/asyncHandler.js'
import { Book } from '../models/book.model.js'

const getBooks=asyncHandler(async(req,res)=>{



    const books= await Book.find()
    
    return res.status(200).json(
        new ApiResponse(200,books, "Books fetched successfully")
    )
    
    

})

export {getBooks}
