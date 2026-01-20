import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Notes", userSchema);