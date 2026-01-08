import Note from "../models/Note.js";
//Controllers
//GET
export const getNotes = async (_, res) => {
    try {
        const notes = (await Note.find().sort({ createdAt: -1 })); //-1 will sort the notes in descending order
        res.status(200).json(notes);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }


}
//GET Note by ID
export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}
//POST
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }

}
//PUT
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true, });
        res.status(200).json({ message: "note updated successfully!", updatedNote });
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
//DELETE
export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "note deleted successfully!", deletedNote });
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}