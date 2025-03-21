import mongoose from 'mongoose';

export async function connect (){
    try {
        mongoose.connect(process.env.MONGODB_URI!, {
            serverSelectionTimeoutMS: 30000,
        });
        const connection = mongoose.connection;
        
        connection.on('CONNECTED',  () => {
            console.log("DB connected");
        })

        connection.on("Error", (error) => {
            console.log("DB Connection failed", error)
        })
    } catch (error) {
        console.log(error)
    }   
}