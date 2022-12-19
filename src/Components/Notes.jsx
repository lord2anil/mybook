import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContect'
import NotesItem from './NotesItem';
function Notes() {
    const context=useContext(noteContext)
  const {notes,setnotes}=context;
  return (
    <div className="container">
        {notes.map((note)=>{
            return <NotesItem note={note}/>
        })}
      </div>
  )
}

export default Notes