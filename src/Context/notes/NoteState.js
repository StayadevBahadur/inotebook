import NoteContext from "./NoteContext";
import React from "react";
import { useState } from 'react';


const NoteState = (props) => {
  // const s1 = {
  //     "name":"Satydev Bahadur",
  //     "roll":"devloper"
  // }
  // const [state, setState] = useState(s1);
  // const update =()=>{
  //     setTimeout(() => {
  //         setState(
  //              {
  //                 "name":"Krishna Bahadur",
  //                 "roll":"devloper"
  //             }
  //         )
  //     }, 1000);
  // }
  const notesInitail = [
    {
      "_id": "65f01b8e599c077580955d4d",
      "user": "65e971361e87468aa2ed0da2",
      "title": "Go for games",
      "description": "You have to go to game at 5pm with all the students",
      "tag": "persnol is here",
      "__v": 0
    },
    {
      "_id": "65f03474d1fb55498774fbec",
      "user": "65e971361e87468aa2ed0da2",
      "title": "Go for Dinner",
      "description": "Go to dinner at 8:30 pms",
      "tag": "persnol is here",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(notesInitail);
  // Function to adding notess
  const addNote = (title,description,tag) => {
    let note =   {
      "_id": "65f01b8e599c077580955d4d",
      "user": "65e971361e87468aa2ed0da2",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    };
    setNotes(notes.concat(note))
    console.log('adding a new note')
  }

  //Function for deleting notes
  const deleteNote = (id) => {
    console.log('deleting the note eith id '+id)
    const newNote = notes.filter((note)=>{return note._id !== id})
    setNotes(newNote)
  }
  // Function for edditing a exsisting note
  const edditNote= ()=>{

  }
  return (
    < NoteContext.Provider value={{ notes, setNotes , addNote, deleteNote,edditNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;   