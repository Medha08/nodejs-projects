const express = require("express")
const app = express();
const port = process.env.PORT || 4000;

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))

app.get("/",(req,res,next)=>{
  res.send("Welcome Home")
})

app.listen(port,(err)=>{
  if(!err){
    console.log(`Articaly listening at port ${port}`)
  }
})