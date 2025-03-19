import mongoose from 'mongoose';

export async function connect (){
    try {
        mongoose.connect(process.env.MONGO_URI!);
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