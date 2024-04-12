import {mongoose,Schema} from "mongoose"

const cartSchema= new Schema(

    {
      userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
      },
      bookId:{
        type: mongoose.Types.ObjectId,
        ref:"Book",
        required: true
      },
      count:{
        type: String,
        required: true
      }

    }


    ,{timestamps: true})

export const Cart= mongoose.model("Cart",cartSchema)