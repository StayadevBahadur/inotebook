import React from 'react'
import NoteContext from '../Context/notes/NoteContext';
import { useContext,useEffect,useState} from "react";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Modal from './Modal';

const Notes = (props) => {  
    const contex = useContext(NoteContext);
    const { notes, getNotes,edditNote } = contex;
    useEffect(()=>{
        getNotes();
    },[])
 
 const [showModal , setModal] = useState(false);

  
 // e.preventDefault()
    const openModal = (currentNote)=>{
        setNote({id:currentNote._id, title:currentNote.title, description:currentNote.description, tag:currentNote.tag});
        if (setModal === false) {
            setModal(true);
        }else{
            setModal(true);
        }
        console.log("clicked on update pen icon")
    }
    const handleClick = async (e)=>{
        e.preventDefault();
       console.log("clike on update submision", note)
       await edditNote(note.id,note.title,note.description,note.tag);
        await getNotes();
       
        setModal(false);
     }
    const[note,setNote]= useState({id : "",title:"",description:"",tag:""})

    const onChange = (e) => {
        e.preventDefault(); 
        setNote({...note,[e.target.name]:e.target.value})
       
    }

    return (
        <>
            <AddNote/>
            {showModal && <Modal setModal = {setModal} onChange = {onChange} note = {note} handleClick= {handleClick} />}
            <div className="row my-3">
                <h2>Your Notes</h2>               
                  {notes.lenght === 0 && "No notes to display"}  
              
                   {notes.map((note, index) => {
                    return <NoteItem note={note} key={index} openModal = {openModal}  />
                }
                )}
            </div>
        </>
    )
}

export default Notes
