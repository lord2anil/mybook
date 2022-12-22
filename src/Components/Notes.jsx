import React, { useContext ,useEffect,useRef,useState} from 'react'
import noteContext from '../Context/notes/NoteContect'
import AddNote from './AddNote';
import NotesItem from './NotesItem';
function Notes() {
  const ref = useRef(null);
  const refclose = useRef(null);
    const context=useContext(noteContext)
  const {notes,getnotes,editNote}=context;
  useEffect(() => {
    // eslint-disable-next-line 
    getnotes();
  }, [])
  // console.log(typeof(notes))
  const [note, setnote] = useState({eid:'',etitle:'',edescription:'',etag:''})
    const handlesubmit=(e)=>{
        e.preventDefault();
        // console.log(note)
       editNote(note.eid,note.etitle,note.edescription,note.etag);
       getnotes();
      

      refclose.current.click();


    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const updatenote=(curnote)=>{
      ref.current.click();
      setnote({eid:curnote._id,etitle:curnote.title,edescription:curnote.description,etag:curnote.tag})
    }
  
  return (
    <>
    <AddNote/>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
          value={note.etitle}
            onChange={onchange}
            type="text"
            className="form-control"
            id="etitle"
            aria-describedby="emailHelp"
            name="etitle"
            minLength={5}
            required
          />
        
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
          value={note.edescription}
          minLength={5}
          required
            onChange={onchange}
            type="text"
            className="form-control"
            id="edescription"
            name='edescription'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            tag
          </label>
          <input
          value={note.etag}

            onChange={onchange}
            type="text"
            className="form-control"
            id="etag"
            name='etag'
          />
        </div>
        
        {/* <button type="submit" onClick={handlesubmit} className="btn btn-primary">
          Submit
        </button> */}


              </form>
              </div>
              <div className="modal-footer">
                <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button  disabled={note.etitle.length<5|| note.edescription.length<5} type="button" onClick={handlesubmit} className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>













      
    <div className="container row ">
      <div className="container ">
        {notes.length===0 &&"No note to display"}
      </div>
        {notes.map((note,i)=>{
            return <NotesItem key={i} note={note} updatenote={updatenote}/>
        })}
      </div>
      </>
  )
}

export default Notes