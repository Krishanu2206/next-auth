import mongoose from "mongoose";

const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log(`Connected to MongoDB ${mongoose.connection.host}`);
        })
        connection.on('error', (err)=>{
            console.log("Failed to connect to MongoDB");
            console.error(err);
            process.exit();
        })
    } catch (error : any) {
        console.log("Something went wrong!");
        console.error(error.message);
    }
}

export default connect;