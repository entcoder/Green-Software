import mpngoose from 'mongoose'
import { ApiError } from '../utills/ApiError.js'
import { ApiResponse } from '../utills/ApiResponse.js'
import { Cart } from '../models/cart.model.js'


const addBookInCart= async(req,res)=>{
  
    const {userId, bookId, count}= req.body


    const existingBook= await Cart.findOne({userId, bookId})

    if(existingBook){
        res.status(400).json({"message": "Book is already there in the cart"})
    }

    const newCartBook= new Cart(
       {
        userId,
        bookId,
        count
       }
    )

    await newCartBook.save();
    res.status(201).json({"message":"Book added to the cart"})

}

const getCartBooks = async (req, res) => {
    try {
      const carts = await Cart.find({userId: req.user._id}).populate('bookId')
      // console.log(carts)
      res.status(200).send({status: 'ok', carts})
    } catch (err) {
      console.log(err)
      
    }
  }



export {addBookInCart,getCartBooks}