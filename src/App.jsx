import React from 'react'
import Weather from './components/Weather.jsx'


const App = () => {
  return (
    <div style={{
      
      background: 'linear-gradient(to right, rgb(58, 58, 58), rgb(15, 15, 15))',
    }} className='min-h-[100vh]'>



      <Weather />
    </div>
  )
}

export default App
