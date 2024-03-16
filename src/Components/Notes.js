import React from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext} from "react";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {  
    const contex = useContext(NoteContext);
    const { notes} = contex;
    // Function to show alert

 

    return (
        <>
            <AddNote  />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note, index) => {
                    return <NoteItem note={note} key={index} />
                }
                )}
            </div>
        </>
    )
}

export default Notes
