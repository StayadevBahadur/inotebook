import React, { useState } from 'react';
import './Modal.css'
const Modal = (props) => {


  return (
    <>
      {/* <div className="modal-container"> */}
      <form className="modal-form">
        <div className="close">
          <button className="close-btn" onClick={() => { props.setModal(false) }}>X</button>
        </div>
        <div className='FromHeading'>
          <h3>  Update Note</h3>

        </div>
        <label>
          Title:
          <input type="text" name="title" value= {props.note.title}  onChange={props.onChange}/>
        </label>
        <label> 
          Descrption:
          <input type="text" name="description" value={props.note.description} onChange={props.onChange}/>
        </label>
        <label>
          Tag:
          <input type="text" name="tag" value={props.note.tag  } onChange={props.onChange}/>
        </label>
        <button type="submit" onClick={props.handleClick}>Update note</button>
      </form>
      {/* </div>  */}
    </>
  );
};

export default Modal;

