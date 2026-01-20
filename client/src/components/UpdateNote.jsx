import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import './UpdateNote.css'

function UpdateNote() {
    const initialNote = {
        header: "",
        content: "",
    };

    const [note, setNote] = useState(initialNote);

    // Loading State
    // - Prevents duplicate API calls
    // - Gives user visual feedback
    // - Improves perceived performance
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setNote((prev) => ({...prev, [name]: value}));
    }

    useEffect(() => {
        const fetchNote = async() => {
            try{
                // Enable loading state before starting the API call
                setLoading(true);

                // Send GET request to fetch note data using the note ID
                const response = await axios.get(`http://localhost:8000/api/notes/${id}`);

                // Update state with the fetched note data
                setNote(response.data);
            } catch (error){
                console.error(error);
                toast.error("Failed to fetch note", {position: "top-right"});
            } finally {
                // Disable loading state whether request succeeds or fails
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const submitForm = async(e) => {
        // Prevents the default form submission behavior (page reload)
        e.preventDefault();
        
        // Validate input: check if header or content is empty (after trimming spaces)
        if (!note.header.trim() || !note.content.trim()) {
            // Show error toast if validation fails
            toast.error("Header and content are required", {position: "top-right"});
            return;
        }

        try {
            // Enable loading state (usually used to disable button or show spinner)
            setLoading(true);

            // Send PUT request to backend to update the note by ID
            const response = await axios.put(`http://localhost:8000/api/update/notes/${id}`, note);

            // Show success message returned from the server
            toast.success(response.data.message, {position: "top-right"});

            // Redirect user to the home page after successful update
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update note", {position: "top-right"});
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
        <div className="update-user">
            <div className="inputGroup">
                <Link to="/" type="button" className="btn btn-secondary">
                    <i className="fa-solid fa-backward"></i>  Back
                </Link>
            </div>

            <h3>Update Note</h3>

            {loading && <p>Loading...</p>}

            <form className="update-userForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Header</span>
                        <input type="text" className="form-control" name="header" placeholder="Enter note heading" value={note.header} onChange={inputHandler} required/>
                    </div>
                </div>
                
                <div className="inputGroup">
                    <div className="input-group">
                        <span className="input-group-text">Content</span>
                        <textarea className="form-control" name="content" value={note.content} onChange={inputHandler} required></textarea>
                    </div>
                </div>
                
                <div className="inputGroup">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Updating..." : "Submit"}
                    </button>
                </div>

                
            </form>
        </div>
        </>
    )
}

export default UpdateNote