const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const connection=mongoose.connect("mongodb+srv://mongo:KpyQNo7KyPLh1UJA@cluster0.kbuce8x.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0")

connection.then(()=>{
    console.log("connection successful")
})
.catch(()=>{
    console.log("connection unsuccessful")
})

const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:{
        type:Array,
        required:true
    }
})

const collection=new mongoose.model("user",loginSchema);

module.exports=collection





