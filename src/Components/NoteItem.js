import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

const NoteItem = (props) => {
    const { note ,} = props;
    const myStyle = {
        borderRadius: '10px',
        background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
        boxShadow: '30px 30px 44px #969696, -30px -30px 44px #ffffff',
        width:'18rem'
        //https://neumorphism.io/#e0e0e0
    }
    const contex = useContext(NoteContext)
    const{deleteNote} =contex;
    return (    
        <div className='col  mx-auto '>
            <div className="card  my-3 " style={myStyle}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text"> {note.description} </p>
                    <i className="fa-solid fa-trash-can fa-xl mx-3" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square fa-xl "></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
