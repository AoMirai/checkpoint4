import React from 'react'
import { Link } from 'react-router-dom'


export default function AdminNav() {
  return (
    <div className="AdminNav">
      <ul>
        <li>
          <Link to="/admin/artist" >Artistes</Link>
        </li>
        <li>
          <Link to="/admin/act" >Numéros</Link>
        </li>
        <li>
          <Link to="/admin/show" >Représentations</Link>
        </li>
      </ul>
    </div>
  )
}
