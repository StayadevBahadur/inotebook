import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Signup.css'







const SingUp = () => {

  const [credentials, setCredentials] = useState({ name:'', email: '', password: '' });

const navigate = useNavigate();


const handleSubmit = async (e)=>{
  e.preventDefault();
  const {name , email, password} = credentials;
  const response = await fetch(`http://localhost:5000/api/auth/CreateUser`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      
    },
    body: JSON.stringify({ name , email, password}),
    
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
  return (<>
    <h4 className='mt-5 text-center'>Creat an Account to Continue </h4>
    <div className="SignUpContainer  p-2"> 
    <form className='container'>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label" >UserName</label>
      <input type="text" className="form-control" id="exampleInputEmail1" name = "name"  placeholder="Enter your UserName"aria-describedby="emailHelp" onChange={onChange}/>
      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
    </div>
    <div className="mb-3">
      <label htmlFor="Email" className="form-label">email</label>
      <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" name="email"  placeholder="Enter your Email" onChange={onChange}/>
      {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
    </div>
    <div className="mb-3">
      <label htmlFor="Password" className="form-label" >Password</label>
      <input type="password" className="form-control" id="Password" placeholder="Enter your password" name="password" onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="CPassword" className="form-label" >Conform Password</label>
      <input type="password" className="form-control" id="CPassword1" placeholder="Enter your password" name="Cpassword" onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </form>
  </div>
  </>
  )
}

export default SingUp
