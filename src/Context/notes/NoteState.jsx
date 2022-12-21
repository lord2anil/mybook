import React,{useState} from 'react'
import NoteContext from './NoteContect'

export default function NodeState(props) {

  const host="http://localhost:5000"
    const notesInitial=[]
  const [notes, setnotes] = useState(notesInitial)
  const getnotes= async ()=>{
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5OTRkMjc4NmUxOTg1MzRmNmZhZDQ2In0sImlhdCI6MTY3MTA2OTkyOH0.h9RchBbqNvqQuUETMgQObCKlUs93FUNDsQOWGgypSvk" },
    
    };
    const response = await fetch(`${host}/api/notes/fetchallnotes`, requestOptions);
    const json=await response.json();
    setnotes(json)
  }


// eslint-disable-next-line
const addNote= async (title,description,tag)=>{
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5OTRkMjc4NmUxOTg1MzRmNmZhZDQ2In0sImlhdCI6MTY3MTA2OTkyOH0.h9RchBbqNvqQuUETMgQObCKlUs93FUNDsQOWGgypSvk" },
    body: JSON.stringify({title,description,tag})
    };
    const response = await fetch(`${host}/api/notes/addnote`, requestOptions);
    const json= await response.json();
    console.log(json);


  const note={
    
        "_id": "639ac1dcas18de909xvz55a1591e50c7",
        "user": "63994d2786e198534f6fad46",
        "title": title,
        "description":description,
        "tag":tag,
        "date": "2022-12-15T06:42:36.360Z",
        "__v": 0
   
    
  }
  setnotes(notes.concat(note));
}

const deleteNote= async (id)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5OTRkMjc4NmUxOTg1MzRmNmZhZDQ2In0sImlhdCI6MTY3MTA2OTkyOH0.h9RchBbqNvqQuUETMgQObCKlUs93FUNDsQOWGgypSvk" },
   
};
const response = await fetch(`${host}/api/notes/deletenote/${id}`, requestOptions);
const json=await response.json();


   setnotes( notes.filter((item) => item._id !== id))
}

const editNote= async (id,title,description,tag)=>{
 
  console.log("hello")
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5OTRkMjc4NmUxOTg1MzRmNmZhZDQ2In0sImlhdCI6MTY3MTA2OTkyOH0.h9RchBbqNvqQuUETMgQObCKlUs93FUNDsQOWGgypSvk" },
    body: JSON.stringify({title,description,tag})
};
const response = await fetch(`${host}/api/notes/updatenote/${id}`, requestOptions);
const json= await response.json();

  let newnotes=JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < notes.length; index++) {
        const element = newnotes[index];
        if(element._id===id){
          newnotes.title=title;
          newnotes.description=description;
          newnotes.tag=tag;
          break;
        }
      }
      console.log(newnotes)
      setnotes(newnotes)
}


  return (
    <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getnotes,editNote}} >
        {props.children}
    </NoteContext.Provider>
    
  )
}
