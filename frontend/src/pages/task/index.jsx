import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import "./style.css"
import moment from 'moment'
import { isAfter } from 'date-fns'

function Task(){
    const[task,setTask]=useState([])    
    const[Exptask,setExpTask]=useState([])    
    const refs=useRef([])
    const momentRef=useRef()
    const[renderr,controlRender]=useState(0)
    const[momemty,setMoment]=useState("date")
    useEffect(()=>{
        async function get(){
            try{
                const res=await axios.get("/api/form/task")
                console.log(res.data)
                console.log(res.data.current)
                console.log(res.data.expired)
                setTask(res.data.current)
                setExpTask(res.data.expired)
            }catch(error){
                console.log(`error=${error}`)
            }

            
        }
        get()
    },[renderr])

    

   


    async function submitted(index){
        const myTask=refs.current[index]
        console.log(myTask.innerHTML);
        const thatTask=myTask.innerHTML;
     
        console.log(thatTask)
        const response=await fetch("/api/form/task",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({delTask:thatTask})
        })
        const arr=renderr
        const data=response.json()
        console.log(data)
        setTask(data.myArray)
        controlRender(prev=>prev+1)
           
        console.log(renderr)

        
    }

    function navigate(url){
        window.location.href=url;
    }

    function goBack(){
        navigate("/")
    }





   



    return(
       <>
        <div className='expired'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Expired Tasks
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Exptask&&Exptask.map((ele,ind)=>{
                        const date=moment(ele.date).format('dddd, DD MM YYYY, HH:mm:ss a')
                        return(
                            <tr key={ind}>
                                <td>your task {ele.task} expired on {date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
        <div className='container'>
        <button onClick={goBack}>Add Another task</button>
            <div className='card'>
                <table>
                    <thead className='table'>
                        <tr>
                            <th>Task</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task&&task.map((element,index)=>{
                            return(
                                <tr key={index}>
                                    <td ref={(el)=>refs.current[index]=el} >{element.task}</td>
                                    <td>{element.date}</td>
                                    <td>
                                        < button  className="close" aria-label='Close' type="button" onClick={()=>submitted(index)}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
       </>
    )
}

export default Task