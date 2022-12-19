import React from 'react'

export default function NotesItem(props) {
    const {note}=props;
  return (
    <>
<div>{note.title}</div>
    <div>{note.description}</div>
    </>
  )
}
