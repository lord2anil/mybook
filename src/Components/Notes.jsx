import React, { useContext ,useEffect} from 'react'
import noteContext from '../Context/notes/NoteContect'
import AddNote from './AddNote';
import NotesItem from './NotesItem';
function Notes() {
    const context=useContext(noteContext)
  const {notes,getnotes}=context;
  useEffect(() => {
    getnotes();
  }, [])
  
  return (
    <>
      <AddNote/>
    <div className="container row">
        {notes.map((note)=>{
            return <NotesItem key={note._id} note={note}/>
        })}
      </div>
      </>
  )
}

export default Notes