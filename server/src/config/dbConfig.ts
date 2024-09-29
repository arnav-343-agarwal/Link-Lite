import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("DATABASE CONNECTED");
    }catch(error){
        console.log(error)
        process.exit(1);
    }
}
export default connectDB;