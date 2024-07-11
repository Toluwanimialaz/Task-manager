const express=require("express")
const collection = require("../config")
const initializePassport=require('../config-passport');
const passport=require('passport')
const router=express.Router()



initializePassport(
    passport,
    async(username)=>await collection.findOne({name:username})
)


router.get("/task",async (req,res)=>{
    const arr=[];
    const ExpiredArr=[]
    try{
        const user = await collection.findOne({name:req.user.name})
        if(user){
            user.tasks.forEach(element => {
                date1=moment(element.date)
                const dateNow=moment().toISOString()
                console.log(dateNow)
                if(dateNow.isAfter(date1)){
                    ExpiredArr.push(element)
                }else{
                    arr.push(element)
                }
            });
        }else{
            console.log("error")
        }
    }catch(error){
        console.log(error)
    }

    res.json({current:arr,expired:ExpiredArr})
    
})

router.post('/task',async(req,res)=>{
    const arr=[]
   try{
        const delTask= req.body.delTask
        console.log(`deltask=${delTask}`)
        const user=await collection.findOne({name:req.user.name});
        if(user){
            user.tasks.map((task,index)=>{
                console.log(`${index}.${task.task}`)
                arr.push(task.task)
                if(task.task===delTask){
                   user.tasks.splice(index,1)
                    arr.splice(index,1)
                }
                
            })
            console.log(`user.tasks=${user.tasks}`)
            console.log(`arr=${arr}`)
            await user.save()
            
            
        }
    }catch(err){
        console.log(err)
   }
   res.json({myArray:arr})
})













module.exports=router