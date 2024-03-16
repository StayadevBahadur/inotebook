import './App.css';
import React from "react";
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  const [alert, setalert] = useState(null);
  // Function to show alert
  const showAlert = (message, type) => {
    setalert({
      message: message, 
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 1000) 

  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert ={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/> }   />
            <Route exact path="/about" element={<About />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );  
}

export default App;
