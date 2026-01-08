import mongoose from "mongoose";
// Create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
} //Auto create createdAt and updatedAt fields
);
// Create a model base off the schema
const Note = mongoose.model("Note", noteSchema);
// Export the model
export default Note;