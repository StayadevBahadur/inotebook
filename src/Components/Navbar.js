import React from 'react'
import { Link ,useLocation,useNavigate } from "react-router-dom";
// import { useEffect } from 'react';
const Navbar = () => {
  let location = useLocation();

  // useEffect(() => { 
  //  console.log(location.pathname)
  // }, [location]);
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/')  
  }
  return (
    <>
   <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary  "  data-bs-theme="dark">
  <div className="container-fluid">
   <Link className="navbar-brand" to="/">NotesCloud</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
         <Link className={`nav-link ${location.pathname === "/about"?"active":" "}`} to="/about">About</Link>
        </li>
      </ul>
    </div>
   {localStorage.getItem('token')?<Link className="btn btn-primary  btn-sm mx-1" role="button" to="/" aria-disabled="true" onClick={handleLogout}>Logout</Link>: <div>
    <Link className="btn btn-primary  btn-sm mx-1" role="button" to="/login" aria-disabled="true">Login</Link>
    <Link className="btn btn-primary btn-sm mx-1" role="button" to="signup" aria-disabled="true">SignUp</Link>
    </div>}
  </div>
</nav>
    </>
  )
}

export default Navbar
