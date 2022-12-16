import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Components/About';
import Home from './Components/Home';

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}>
         
          <Route path="blogs" element={<About />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
