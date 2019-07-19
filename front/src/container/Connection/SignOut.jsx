import React, { Component } from 'react'
import {
  NotificationManager,
} from 'react-notifications';
import { NavLink } from 'reactstrap'
import { userDisconnect } from '../../actions/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class SignOut extends Component {

  disconnect = () => {
    const { userDisconnect } = this.props
    const deco = new Promise((resolve, reject) => {
      resolve(userDisconnect())
      reject()
    })
    deco.then(()=> {
      NotificationManager.success('', 'Déconnection réussie.', 1000);
    })
    
  }

  render() {
    return (
        <NavLink  tag={Link} onClick={this.disconnect} className="SignOut" to='/signin'>Déconnection</NavLink>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token
})

const mapDispatchToProps = dispatch => bindActionCreators({
  userDisconnect,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SignOut)