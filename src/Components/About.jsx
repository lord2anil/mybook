import React, { useContext } from 'react'
import noteContext from '../Context/notes/NoteContect'


export default function About() {
  const a=useContext(noteContext)
  return (
    <div>About
     {a.name}
    </div>
  )
}
