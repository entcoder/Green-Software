import { mongoose,Schema } from "mongoose";

const bookSchema= new Schema(
    
    {
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        
        country:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        year:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            default: 0
        },
        image_link:{
            type: String,
            required: true
        }

    }
    
    ,{timestamps:true})

    export const Book= mongoose.model("Book", bookSchema)