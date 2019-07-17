import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Navbar({token}) {
  return (
    <div className="Navbar">
      <ul>
        <div>
          <li>
            <Link to="/">Acceuil</Link>
          </li>
          <li>
            <Link to="/act">Numéros</Link>
          </li>
          <li>
            <Link to="/box-office">Billetterie</Link>
          </li>
        </div>
        {token ? 
        <div>
          Admin : 
          <li>
            <Link to="/admin/signout">Déconnection</Link>
          </li>
          <li>
            <Link to="/admin/artist" >Artistes</Link>
          </li>
          <li>
            <Link to="/admin/act" >Numéros</Link>
          </li>
          <li>
            <Link to="/admin/show" >Représentations</Link>
          </li>
        </div>
        : ''}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  token: state.user.token
})


export default connect(mapStateToProps)(Navbar)
