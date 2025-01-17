import React,{useState,useEffect,useRef} from 'react'
import Lottie from 'lottie-react'
import animationData from '../../assets/Animation - 1720008044275.json'
import { motion } from 'framer-motion';
import axios from 'axios'
import './style.css'
import Navbar from '../../components/navbar'
import Modal from '../../components/modal'

function handleClick(){

}

function navigate(url){
    window.location.href=url;
}



function Home(){
    const aniRef=useRef()
    const[stuff,setStuff]=useState({})
    const[modal,setModal]=useState(false)
    const[newDate,setNewDate]=useState(new Date())
    const[newTask, setTask]=useState("")

    function handleTask(event){
        const value=event.target.value;
        setTask(value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        const w= event.target;
        console.log(w);

        const dataa=new FormData(w)
        const textData=new URLSearchParams(dataa)
        console.log(...dataa)
        const response=await fetch('http://localhost:5173/api/form',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({task:newTask,date:newDate})
        })

        const data=await response.json()
        alert(data.message)
        navigate("/task")
    }

    function handleChange(date){
        setNewDate(date)
    }

    function handleOpen(){
        setModal(true)
        console.log(modal)
    }

    function handleClose(){
        setModal(false)
        console.log(modal)
    }


    useEffect(()=>{
        axios.get("/api")
        .then(res=>{
            console.log(res)
            setStuff(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    return(
        <div  className='background'>
            <Lottie onComplete={()=>{
                console.log("complete");
                aniRef.current?.goToAndPlay(1,true);
                aniRef.current?.play()
            }} lottieRef={aniRef} animationData={animationData} loop={false} style={{height:"150px",position:"absolute",top:"0px",right:"500px"}}/>
            <Navbar  name={stuff.names}/>
            <div className='title'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <h2>Welcome to your personal Task manager,{stuff.names}</h2>
                    <h4>To Add a task click the button below</h4>
                </motion.div>
                <Modal handleTask={handleTask} handleOpen={handleOpen} handleClose={handleClose} modals={modal} handleChange={handleChange} handleSubmit={handleSubmit} date={newDate}/>
            </div>
            
        </div>
    )
}



export default Home