import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SignOut from '../Connection/SignOut';

function Navbar({ token }) {
  return (
    <div className="Navbar">
      <ul>
      {token ?
        <div className="nav-admin">
          Admin :
            <li>
            <SignOut />
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
        :
        <div className="nav-visitor">
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
          <div>
          <Link to="/signin">Admin</Link>
          </div>
        </div>
      }
      </ul>
    </div >
  )
}

const mapStateToProps = (state) => ({
  token: state.user.token
})


export default connect(mapStateToProps)(Navbar)
