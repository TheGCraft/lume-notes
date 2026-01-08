import express from "express";
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesControllers.js";
const router = express.Router();

//Endpoints
//GET
router.get("/", getNotes);
router.get("/:id", getNoteById);
//POST
router.post("/", createNote);
//PUT
router.put("/:id", updateNote);
//DELETE
router.delete("/:id", deleteNote);



export default router;