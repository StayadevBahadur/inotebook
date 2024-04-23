import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'



const Login = () => {

const [credentials, setCredentials] = useState({ email: '', password: '' });

const navigate = useNavigate();


const handleSubmit = async (e)=>{
  e.preventDefault();
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3NlciI6eyJpZCI6IjY1ZTk3MTM2MWU4NzQ2OGFhMmVkMGRhMiJ9LCJpYXQiOjE3MDk4MjkyMDN9.eutxRwHjO_OFG4N9T7ZuUi92xgw-qo4jxCdo0aht0Jc"
    },
    body: JSON.stringify({ email:credentials.email  , password:credentials.password}),
    
  });
 
  
  const jsonResponse = await response.json();
  console.log(jsonResponse);

  if(jsonResponse.success){
    localStorage.setItem( 'token',jsonResponse.authToken);
    navigate('/');
  }
}

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  

  return (
    <>
   <h4 className='mt-5 text-center'>Login to Continue </h4>
    <div className="LoginContainer">
    <form className='p-2'>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </form>
  </div>
  </>
  )
}

export default Login
