import { useState } from 'react'
import{Routes,Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import Task from './pages/task'

function App() {
  const [count, setCount] = useState(0)
  const[modal,setModal]=useState(false)

  function handleOpen(){
    setModal(true)
  }

  function handleClose(){
    setModal(false)
  }

  return (
    <>

      <div className='home'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/task' element={<Task/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
