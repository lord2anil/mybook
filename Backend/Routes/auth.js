const express=require('express');
const User = require('../model/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
var fetchuser=require('../Middware/Fetchuser')


router.post('/createuser',[
 
    body('email','Email is not in valid').isEmail(),

  body('password','passward is not in valid').isLength({ min: 5 }),
  body('name','name is not in valid').isLength({ min: 5 }),

],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false

      return res.status(400).json({success, errors: errors.array() });
    }
    try
    {
    
    
    let user= await User.findOne({email:req.body.email})

    if(user){
        return res.status(400).json({error:"user with email is already exits"})
    }
    const salt= await bcrypt.genSalt(10)
    const secPass=await bcrypt.hash(req.body.password,salt)
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
        user:{
            id:user.id
        }
      }
      const jwtdata = jwt.sign(data, 'shhhhh');
      console.log(jwtdata)
      success=true

      res.json({jsuccess,wtdata})}
      catch (error)
    {console.log('some error occured'),
    req.status(500).send("Internal server error occured")
    
    }

})








router.post('/login',[
    body('email','Email is not valid').isEmail(),

  body('password','passward is not valid').exists(),


],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false
      return res.status(400).json({success, errors: errors.array() });
    }



    const {email,password}=req.body;
    try
    {

    const user=  await User.findOne({email});
    
    
    if(!user){
        return res.status(400).json({error:"Please enter correct cardantials"})
    }
    
    const PasswordCompare= await bcrypt.compare(password,user.password)
    if(!PasswordCompare){
      return res.status(400).json({error:"Please enter correct cardantials"})
    }
    const data={
      user:{
          id:user.id
      }
    }

      const jwtdata = jwt.sign(data, 'shhhhh');
      success=true
      
      res.json({success,jwtdata})}
      catch (error)
    {
    req.status(500).send("Internal server error occured")
    
    }

})





router.post('/getuser',fetchuser,async (req,res)=>{
  
  try
  {
   UserId=req.user.id
  const user=await User.findById(UserId).select("-password")
  res.send(user)
  }
  
    catch (error)
  {
    console.log('some error occured'),
  req.status(500).send("Internal server error occured")
  
  }

})








module.exports=router;