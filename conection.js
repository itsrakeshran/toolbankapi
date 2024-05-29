import mongoose from "mongoose";

const dbUrl='mongodb://127.0.0.1:27017/toolstore'


const dbConnection=async()=>{
    try{
        await mongoose.connect(dbUrl,console.log("Database Connected Sucessfully"))
    }catch{
        console.log("Database connection faild")
    }
}

export default dbConnection;
