import React, { Component } from 'react'
import {
  NotificationManager,
} from 'react-notifications';
import { Link } from 'react-router-dom'
import { userDisconnect } from '../../actions/user';
import { connect } from 'react-redux';
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
      <li onClick={this.disconnect}>
        <Link to='/'>Déconnection</Link>
      </li>
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