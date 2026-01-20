import express from "express";

import {create, getAllNotes, getNoteById, editNotes, deleteNotes} from "../controller/userController.js";

const route = express.Router();

route.post("/notes", create);
route.get("/notes", getAllNotes);
route.get("/notes/:id", getNoteById);
route.put("/update/notes/:id", editNotes);
route.delete("/delete/notes/:id", deleteNotes);

export default route;