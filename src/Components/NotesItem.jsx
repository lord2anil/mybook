import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContect'

export default function NotesItem(props) {
    const {note}=props;
    const context=useContext(noteContext)
    const {deleteNote}=context;
     

  return (
    <>
    <div className="col-md-3">

        <div className="card my-3" >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id)}} ></i>
            <i className="fa-solid fa-pen-to-square"></i>
            
        </div>
        </div>
        </div>
    </>
  )
}
