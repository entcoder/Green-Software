import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"
import importData from "./seederScript.js"


dotenv.config({
    path: './.env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`⚙️ Server is running on port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
   console.log("Error while connecting to MongoDB",err)
})  

