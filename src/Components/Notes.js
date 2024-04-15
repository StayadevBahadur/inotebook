import React from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext,useEffect,useState} from "react";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Modal from './Modal';

const Notes = (props) => {  
    const contex = useContext(NoteContext);
    const { notes,getNotes} = contex;
    useEffect(()=>{
        getNotes();
    },[])
 
 const [showModal , setModal] = useState(false);

    const MyModal = ()=>{

        return <>
        <Modal setModal={setModal}/>
        </>
    };

    return (
        <>
            <AddNote  />
            {showModal &&<MyModal />}
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note, index) => {
                    return <NoteItem note={note} key={index} setModal = {setModal}/>
                }
                )}
            </div>
        </>
    )
}

export default Notes
