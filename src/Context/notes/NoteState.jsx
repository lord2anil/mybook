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
    // const json=response.json();





  const note={
    
        "_id": "639ac1dcas18dexvz55a1591e50c7",
        "user": "63994d2786e198534f6fad46",
        "title": {title},
        "description":{description},
        "tag":{tag},
        "date": "2022-12-15T06:42:36.360Z",
        "__v": 0
   
    
  }
  setnotes(notes.concat(note));
}

const deleteNote=(id)=>{
   setnotes( notes.filter((item) => item._id !== id))
}

const editNote= async (id,title,description,tag)=>{

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5OTRkMjc4NmUxOTg1MzRmNmZhZDQ2In0sImlhdCI6MTY3MTA2OTkyOH0.h9RchBbqNvqQuUETMgQObCKlUs93FUNDsQOWGgypSvk" },
    body: JSON.stringify({title,description,tag})
};
const response = await fetch(`${host}/api/notes/updatenote/${id}`, requestOptions);
const json=response.json();




  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id===id){
      element.title=title;
      element.description=description;
      element.tag=tag;
      break;
    }
    
  }
}



  return (
    <NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getnotes}} >
        {props.children}
    </NoteContext.Provider>
    
  )
}
