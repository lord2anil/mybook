const express=require('express')
const router=express.Router();
const fetchuser=require('../Middware/Fetchuser')
const Note = require('../model/Note');
const { find } = require('../model/User');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
    const notes=await Note.find({user:req.user.id})
    
    res.json(notes);}
    catch (error)
    {console.log('some error occured'),
    req.status(500).send("Internal server error occured")
    
    }

})


router.post('/addnote',fetchuser, [
    body('title','min title length is 3').isLength({ min: 3 }),
  body('description','min description length is 3').isLength({ min: 5 }),

],async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote=await note.save();
    res.json(savedNote)
}
    catch (error)
    {console.log('some error occured'),
    req.status(500).send("Internal server error occured")
    
    }
    
})



router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    let newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    let note= await Note.findById(req.params.id);
    if(!note){ 
        
        return res.status(404).send("not Found")}

    if(note.user.toString()!=req.user.id){
        
        return res.status(404).send("Not allowed")
    }
    note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    
    res.json({note});


    }
    catch (error)
    {console.log('some error occured'),
    req.status(500).send("Internal server error occured")
    
    
    }
    
})



router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
    

    let note= await Note.findById(req.params.id);
    if(!note){ 
        return res.status(404).send("not Found")}
        
        if(note.user.toString()!=req.user.id){
        
        
        return res.status(404).send("Not allowed")
    }
    note= await Note.findByIdAndDelete(req.params.id)
    
    res.json({"success":"note deleted"});

    }
    catch (error)
    {console.log('some error occured'),
    req.status(500).send("Internal server error occured")
    
    }
    
})

module.exports=router;