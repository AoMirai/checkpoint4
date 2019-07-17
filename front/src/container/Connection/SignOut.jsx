import React, { Component } from 'react'
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { userDisconnect } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignOut extends Component {

  disconnect = () => {
    const { history, location: { state }, userDisconnect } = this.props
    const deco = new Promise((resolve, reject) => {
      resolve(userDisconnect())
      reject()
    })
    deco.then(()=> {
      NotificationManager.success('', 'Déconnection réussie.', 1000);
      setTimeout(() => {
        const nextLocation = state ? state.from.pathname : '/';
        history.push(nextLocation);
      }, 1000);
    })
    
  }

  render() {
    return (
      <li onClick={this.disconnect}>
        Déconnection
        <NotificationContainer/>
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