import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li>
          <Link to="/act">Numéros</Link>
        </li>
        <li>
          <Link to="/box-office">Billetterie</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
