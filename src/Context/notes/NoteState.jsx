import React,{useState} from 'react'
import NoteContext from './NoteContect'

export default function NodeState(props) {

  const host="http://localhost:5000"
    const notesInitial=[]
  const [notes, setnotes] = useState(notesInitial)
  const getnotes= async ()=>{
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json','auth-token':localStorage.getItem("token") },
    
    };
    const response = await fetch(`${host}/api/notes/fetchallnotes`, requestOptions);
    const json=await response.json();
    setnotes(json)
  }


// eslint-disable-next-line
const addNote= async (title,description,tag)=>{
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','auth-token':localStorage.getItem("token") },
    body: JSON.stringify({title,description,tag})
    };
    const response = await fetch(`${host}/api/notes/addnote`, requestOptions);
    const note= await response.json();
  
  setnotes(notes.concat(note));
}

const deleteNote= async (id)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json','auth-token':localStorage.getItem("token") },
   
};
const response = await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);
// eslint-disable-next-line
const json=await response.json();


   setnotes( notes.filter((item) => item._id !== id))
}

const editNote= async (id,title,description,tag)=>{
 
  // console.log("hello")
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','auth-token':localStorage.getItem("token") },
    body: JSON.stringify({title,description,tag})
};
const response = await fetch(`${host}/api/notes/updatenote/${id}`, requestOptions);
// eslint-disable-next-line
const json= await response.json();
  
  let newnotes= await JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        const element = newnotes[index];
        if(element._id===id){
          newnotes.title=title;
          newnotes.description=description;
          newnotes.tag=tag;
          break;
        }
      }
      // console.log(newnotes)
      setnotes(newnotes)
}


  return (
    <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getnotes,editNote}} >
        {props.children}
    </NoteContext.Provider>
    
  )
}
