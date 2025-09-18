import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar />
        <div className='min-h-[83.5vh]'><div className="absolute inset-0 -z-10 h-full w-full bg-white 
                [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div><Manager /></div>
        <Footer />
      </div>
    </>
  )
}

export default App
