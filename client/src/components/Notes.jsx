import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import NotesCard from "./NotesCard";
import "./Notes.css"

function Notes() {
    // State to store all notes fetched from backend
    const [notes, setNotes] = useState([]);

    // State to store user input when adding a new note
    const [userNote, setUserNote] = useState({
        header: "",
        content: "",
    });

    // Handler for input fields (updates userNote state dynamically)
    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUserNote({...userNote, [name]: value});
    }

    // useEffect runs once when component mounts to fetch existing notes from backend
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:8000/api/notes");
                console.log(response.data); // Check what you actually receive

                // Ensure response is an array, fallback to empty array if undefined
                setNotes(Array.isArray(response.data) ? response.data : response.data.data || []);
            } catch(error) {
                console.log("Error while fetching data.", error)
                setNotes([]); // If fetch fails, reset notes to empty
            }
        }
        fetchData()
    }, []) // Empty dependency array => runs only once on mount

    // Function to delete a note
    const deleteNote = async(noteId) => {
        await axios.delete(`http://localhost:8000/api/delete/notes/${noteId}`)
        .then((response) => {
            // Remove the deleted note from local state
            setNotes((prevNote) => prevNote.filter((notes) => notes._id !== noteId))
            toast.success(response.data.message, {position: "top-right"})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // Function to submit a new note
    const submitNote = async() => {
        // Validation: ensure header & content are filled
        if (!userNote.header || !userNote.content) {
            toast.error("Please fill all fields", {position: "top-right"});
            return;
        }

        try {
            // Send POST request to backend to save the note
            const response = await axios.post("http://localhost:8000/api/notes", userNote);

            // Add the newly created note to local state to immediately display it
            setNotes([...notes, response.data]); // Adds new note to list
            toast.success("Note added successfully!", { position: "top-right" });

            // Clear input fields after submission
            setUserNote({ header: "", content: "" });
        } catch (error) {
            console.log(error);
            toast.error("Failed to add note", {position: "top-right"});
        }
    }

    return(
        <>
        <div className="user-input">
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Header</span>
                <input type="text" className="form-control" name="header" placeholder="Enter note heading" value={userNote.header} onChange={inputHandler}/>
            </div>
            <div className="input-group">
                <span className="input-group-text">Content</span>
                <textarea className="form-control" name="content" placeholder="Enter note content" value={userNote.content} onChange={inputHandler}></textarea>
            </div>

            <button type="button" className="btn btn-primary" onClick={submitNote}>Submit</button>
        </div>

        {/* Display notes */}
        {notes.length === 0 ? (
            // If no notes, show placeholder
            <div className="noData">
                <h3>No Data to display</h3>
                <p>Please add new note</p>
            </div>
        ) : (
            // If notes exist, map over them and render NotesCard components
            <div className="user-notes">
                {notes.map((note, index) => {
                    return(
                        <NotesCard key={note._id}           // unique key for React
                                id={note._id}               // id used for delete/edit
                                header={note.header}        // note title
                                content={note.content}      // note content
                                handleDelete={deleteNote}/> // function to delete
                    );
                })}
            </div>
        )}
        
        </>
    )
}

export default Notes