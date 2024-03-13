import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  return (
    <> 
    <Router>   
    <Navbar /> 
      <Routes>
        <Route exact path="/" element={<Home/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
