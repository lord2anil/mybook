import React, {useState,useEffect} from  'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const [log, setlog] = useState({name:"", email:'',password:'' ,cpassword:''})
  const showAlert= props.showAlert;
  let history=useNavigate();

  const onchange=(e)=>{
    setlog({...log,[e.target.name]:e.target.value})
       }
      const handlesubmit=async(e)=>{
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:log.name,email:log.email,password:log.password})
        };
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, requestOptions);
        const json= await response.json();
        // console.log(json);
        if(json.success===true){
          // localStorage.setItem('token',json.jwtdata);
          history('/Login')
          showAlert("user created successfully","success")
          // alert("user created successfully")
        }
        if(json.success===false){
          showAlert(json.error,"Alert")

          // alert(json.error)
        }

      }



      function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
      const [validate, setvalidate] = useState(false)
      const [blankMsg, setblankMsg] = useState("")
      const [passMsg, setpassMsg] = useState("")
      const [conMsg, setconMsg] = useState("")
      const [emailMsg, setemailMsg] = useState("")
     useEffect(() => {
      if(log.name===''||log.name.length<3){
        setblankMsg( "**Fill the name please!")}
        else{
          setblankMsg("")
        } 

      if(log.password===''||log.password.length<5){
        ;
        setpassMsg( "**Password is Invalid!")}
        else{
          setpassMsg("")
        } 
      if(log.password!==log.cpassword){
        

        setconMsg( "**Passwords are not same!")}
        else{
          setconMsg("")
        } 

        if (!isValidEmail(log.email)) {
          
          

          setemailMsg('Email is invalid');
        } else {
        setemailMsg("");
        }
        // eslint-disable-next-line
        if(emailMsg===''&&passMsg===''&&conMsg===''&&blankMsg===''){
          setvalidate(true);
        }else{
          setvalidate(false);

        }
    
        // eslint-disable-next-line
     }, [log])
     

      






  return (
    <div>
      <form onSubmit={handlesubmit} >
      <div className="mb-3">
            <label   htmlFor="name" className="form-label">Name</label>
            <input   type="text" value={log.name} className="form-control" id="name" aria-describedby="emailHelp" name='name'  onChange={onchange} />
            <span  style={{color:"red"}}> {blankMsg} </span> <br />
            
        </div>
      <div className="mb-3">
            <label   htmlFor="email" className="form-label">Email address</label>
            <input   type="email" value={log.email} className="form-control" id="email" aria-describedby="emailHelp" name='email'  onChange={onchange} />
            <span  style={{color:"red"}}> {emailMsg} </span> <br />
             
        </div>
        <div className="mb-3">
            <label  htmlFor="password" className="form-label">Password</label>
            <input type="password" value={log.password} className="form-control" id="Password" name='password' onChange={onchange}/>
            <span  style={{color:"red"}}> {passMsg} </span> <br />

        </div>
        <div className="mb-3">
            <label  htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" value={log.cpassword} className="form-control" id="cPassword" name='cpassword' onChange={onchange}/>
            <span  style={{color:"red"}}> {conMsg} </span> <br />

        </div>

      <button disabled={validate} type="submit" className="btn btn-primary">SignUp</button>
</form>
    </div>
  )
}
