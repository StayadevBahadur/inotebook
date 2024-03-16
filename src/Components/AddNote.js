import React from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext,useState } from 'react';



const AddNote = (props) => {

    const contex = useContext(NoteContext);
    const { addNote } = contex;
 
    const[note,setNote]= useState({title:"",description:"",tag:""})
    const handleAddNote = (e) => {
        e.preventDefault(); 
       addNote(note.title,note.description,note.tag)

    }
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAddNote} >Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
