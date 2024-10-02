import React from 'react'
import Weather from './components/Weather.jsx'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='bg-neutral-800 min-h-[100vh]'>
      <Navbar />
      
      
      <Weather />
    </div>
  )
}

export default App
