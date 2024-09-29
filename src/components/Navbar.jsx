import React from 'react'
import Logo from './logo'
const Navbar = () => {
  return (
    <div>
      <Logo />
      <div>
        <ul>
          <li>Today</li>
          <li>Tommorow</li>
          <li>Monthly Forecast</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
