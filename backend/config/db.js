import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kuldipsingh:99799@cluster0.ozawd.mongodb.net/').then(()=>console.log("DB Connected"));
}