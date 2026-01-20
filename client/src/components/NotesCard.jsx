import { Link } from "react-router-dom"

function NotesCard(props) {

    return(
        <>
        {/* Card container */}
        <div className="card" style={{width: "20rem"}}>
            <div className="card-body">
                <h3 className="card-title">{props.header}</h3>
                <p className="card-text">{props.content}</p>
                <div className="action-buttons">
                    {/* Delete button triggers handleDelete function passed via props */}
                    <button onClick={() => props.handleDelete(props.id)} type="button" className="btn btn-danger">
                        <i className="fa-solid fa-trash"></i> Delete
                    </button>

                    <Link to={`/update/notes/${props.id}`} className="btn btn-primary">
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                    </Link>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default NotesCard