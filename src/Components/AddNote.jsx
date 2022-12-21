import React, { useContext,useState } from 'react'
import noteContext from '../Context/notes/NoteContect'

export default function AddNote() {
    const context=useContext(noteContext)
    const {addNote}=context;
    const [note, setnote] = useState({title:'',description:'',tag:''})
    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log("heloo this is anil")
       addNote(note);
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <p>Add a note</p>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onchange}
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onchange}
            type="text"
            className="form-control"
            id="description"
            name='description'
          />
        </div>
        
        <button type="submit" onClick={handlesubmit} className="btn btn-primary">
          Submit
        </button>


      </form>
    </div>
  )
}
