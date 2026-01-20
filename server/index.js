import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", route);

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

const startServer = async() => {
    try {
        await mongoose.connect(MONGOURL)
        console.log("DB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on PORT : ${PORT}`);
        });
        
    } catch (error) {
        console.error("Database connection failed", error.message);
        process.exit(1);
    }
}

startServer();