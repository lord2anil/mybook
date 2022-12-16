const mongoose=require('mongoose')
const mongoURL='mongodb://127.0.0.1:27017/inotebook'
mongoose.set('strictQuery', true);
const connectTOmongo=()=>{
    
    mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
}
module.exports=connectTOmongo;