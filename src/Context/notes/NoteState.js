import NoteContext from "./NoteContext";
import React from "react";
import { useState } from 'react';
import { json } from "react-router-dom";


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

  const host = "http://localhost:5000/api/";
  const notesInitail = []
  const [notes, setNotes] = useState(notesInitail);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }
  // Function to adding notess
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header

    });
    
    const note = await response.json();
  
    setNotes(notes.concat(note))
    console.log('adding a new note')
  }

  //Function for deleting notes
  const deleteNote = async (id) => {
    const response = await fetch(`${host}notes/deleteNote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },

    });
    console.log('deleting the note eith id ' + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  // Function for edditing a exsisting note
  const edditNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    let newNote = JSON.parse(JSON.stringify(notes))
    const json = await response.json();
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
      }
    }
    // setNotes(newNo te)
  }
  return (
    < NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, edditNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;   