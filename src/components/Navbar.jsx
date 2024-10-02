import React from 'react'
import Logo from './logo'
const Navbar = () => {
  return (
    <div className='flex justify-between py-6 px-8 bg-neutral-800 text-white'>
      <Logo />
      <div>
        <ul className='flex gap-14 mx-20 text-3xl my-4'>
          <li>Today</li>
          <li>Tommorow</li>
          <li>Monthly Forecast</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
