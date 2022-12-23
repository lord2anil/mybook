import React,{useState} from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './Components/About';
import Home from './Components/Home';
import NodeState from './Context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';

export default function App() {
  const [alert, setalert] = useState(null)

  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type,
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <NodeState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>

    <div className="container my-4">
      <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert} />}/>
         
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Login" element={<Login  showAlert={showAlert} />} />
          <Route exact path="/Signup" element={<Signup  showAlert={showAlert} />} />
          
        
      </Routes>
      </div>
    </BrowserRouter>
    </NodeState>
  )
}
