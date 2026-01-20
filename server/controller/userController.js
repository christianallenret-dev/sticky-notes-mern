import Note from "../model/userModel.js";

export const create = async(req, res) => {
    try {

        const newHeader = new Note(req.body);
        const {header} = newHeader;

        if (!header) {
            return res.status(400).json({ message: "Header is required." });
        }

        const headerExist = await Note.findOne({header});

        if (headerExist) {
            return res.status(400).json({message: "Header already exists."});
        }

        const savedNote = await newHeader.save();

        return res.status(200).json(savedNote);

    } catch(error) {
        return res.status(500).json({errorMessage: error.message});
    }
} 

export const getAllNotes = async(req, res) => {
    try {

        const notesData = await Note.find();

        if (!notesData || notesData.length === 0) {
            return res.status(404).json({message: "Note header not found."});
        }

        return res.status(200).json(notesData);

    } catch (error) {
        return res.status(500).json({errorMessage: error.message});
    }
}

export const getNoteById = async(req, res) => {
    try {
        const id = req.params.id;
        const headerExist = await Note.findById(id);

        if (!headerExist) {
            return res.status(404).json({message: "Header does not exist."});
        }

        res.status(200).json(headerExist);
    } catch (error) {
        res.status(500).json({errorMessage:error.message});
    }
};

export const editNotes = async(req, res) => {
    try {

        const id = req.params.id;
        const headerExist = await Note.findById(id);

        if (!headerExist) {
            return res.status(404).json({message: "Header does not exist."});
        }

        await Note.findByIdAndUpdate(id, req.body, {new: true});

        return res.status(200).json({message: "Header successfully updated."});

    } catch(error) {
        return res.status(500).json({errorMessage: error.message});
    }
}

export const deleteNotes = async(req, res) => {
    try {

        const id = req.params.id;
        const headerExist = await Note.findById(id);

        if (!headerExist) {
            return res.status(404).json({message: "Header does not exist."});
        }

        await Note.findByIdAndDelete(id);

        return res.status(200).json({message: "Header successfully deleted."});

    } catch(error) {
       return res.status(500).json({errorMessage: error.message});
    }
}