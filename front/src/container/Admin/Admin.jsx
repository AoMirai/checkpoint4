import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Admin.scss'


class Admin extends Component {
  render() {
    const { userName } = this.props
    return (
      <div className="Admin">
        <p>
          Bonjour, {userName}
          <br></br>
          Vous êtes sur la partie adminitrateur du site.
        <br></br>
          Choisisez une partie à moderer.
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.name,
})

export default connect(mapStateToProps)(Admin);