import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Components/About';
import Home from './Components/Home';
import NodeState from './Context/notes/NoteState';

export default function App() {
  return (
    <NodeState>
    <BrowserRouter>
    <Navbar/>
    <div className="container my-4">
      <Routes>
        <Route exact path="/" element={<Home />}/>
         
          <Route exact path="/About" element={<About />} />
          
        
      </Routes>
      </div>
    </BrowserRouter>
    </NodeState>
  )
}
