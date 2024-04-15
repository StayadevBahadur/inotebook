import React, { useState } from 'react';
import './Modal.css'
const Modal = (props)  => {
  

  return (
    <>
    {/* <div className="modal-container"> */}
    <form className="modal-form">
    <div className="close">
    <button className="close-btn" onClick={()=>{props.setModal(false)}}>X</button>
        </div>   
    <div className='FromHeading'> 
    <h3>  Update Note</h3>
   
    </div>  
      <label>
        Title:
        <input
          type="text"
          name="firstName"
         
        />
      </label>
      <label>
        Descrption:
        <input
          type="text"
          name="lastName"
         
        />
      </label>
      <label>
       Tag:
        <input
          type="email"
          name="email"
      
        />
      </label>
      <button type="submit">Update note</button>
    </form>
    {/* </div>  */}
    </>
  );
};

export default Modal;
