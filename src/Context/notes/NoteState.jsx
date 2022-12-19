import React,{useState} from 'react'
import NoteContext from './NoteContect'

export default function NodeState(props) {
    const notesInitial=[
      {
        "_id": "639ac1db18de55a1591e50c5",
        "user": "63994d2786e198534f6fad46",
        "title": "hello",
        "description": "kasjdfnd  jdoiwj d",
        "date": "2022-12-15T06:42:35.403Z",
        "__v": 0
      },
      {
        "_id": "639ac1dc18de55a1591e50c7",
        "user": "63994d2786e198534f6fad46",
        "title": "hello",
        "description": "kasjdfnd  jdoiwj d",
        "date": "2022-12-15T06:42:36.360Z",
        "__v": 0
      },
    
  ]
  const [notes, setnotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes,setnotes}} >
        {props.children}
    </NoteContext.Provider>
    
  )
}
