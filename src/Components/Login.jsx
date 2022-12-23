import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';



export default function Login(props) {
    const showAlert= props.showAlert;
    let history=useNavigate();
    const [log, setlog] = useState({email:'',password:''})
    const handlesubmit=async(e)=>{
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:log.email,password:log.password})
        };
        const response = await fetch(`http://localhost:5000/api/auth/login`, requestOptions);
        // eslint-disable-next-line
        const json= await response.json();
        // console.log(json);
        if(json.success===true){
            showAlert("login successful","success")
            localStorage.setItem('token',json.jwtdata);
            history('/');

        }else{
            showAlert("Please enter correct credential","Alert")



        }

    }
    const onchange=(e)=>{
        setlog({...log,[e.target.name]:e.target.value})
    }


  


  return (
    <div>
        <form onSubmit={handlesubmit} >
        <div className="mb-3">
            <label   htmlFor="email" className="form-label">Email address</label>
            <input   type="email" value={log.email} className="form-control" id="email" aria-describedby="emailHelp" name='email'  onChange={onchange} />
            
        </div>
        <div className="mb-3">
            <label  htmlFor="password" className="form-label">Password</label>
            <input type="text" value={log.password} className="form-control" id="Password" name='password' onChange={onchange}/>
        </div>

      <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}
