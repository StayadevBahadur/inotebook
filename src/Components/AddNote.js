import React from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext,useState } from 'react';




const AddNote = (props) => {

    const contex = useContext(NoteContext);
    const { addNote } = contex;
 
    const[note,setNote]= useState({title:"",description:"",tag:""})
    const handleAddNote = async (e) => {
        e.preventDefault(); 
        await addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
    }   
    const onChange = (e) => {
        setNote({...note,[e.target.name]:e.target.value})
    }
   
    return (<>
       
        <div>
      
            <div className="container my-3">
           
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value = {note.title} name='title' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description"  value = {note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag"  value = {note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm" onClick={handleAddNote} >Add Note</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default AddNote
