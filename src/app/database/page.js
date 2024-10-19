import mongoose from "mongoose";

const connectToDb=async()=>{
    const url = "mongodb+srv://student:student123@student.bij9g.mongodb.net/";

    try {
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Student database connection is successful');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

export default connectToDb; 