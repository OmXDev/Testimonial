import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Testimonials");
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(error);
    }
};

export default connectDB;
