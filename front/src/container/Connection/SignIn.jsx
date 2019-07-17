import React, { Component } from 'react';
import {
  NotificationManager,
} from 'react-notifications';
import { userRegister } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

 class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    const { userRegister, history } = this.props;
    event.preventDefault();
    fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error();
    })
    .then((user) => {
      console.log(user);
      NotificationManager.success('', 'Authentification réussi.', 1000);
      userRegister(user);
      history.push('/admin')
    })      
    .catch((err) => {
      console.log(err);
      NotificationManager.error('', "Erreur d'authentification.", 3000);
    });
  }

  render() {
    const { login, password } = this.state
    return (
      <div className="SignIn">
        <h3>Login Admin</h3>
        <form onSubmit={this.submitForm}>
          <label htmlFor="login">
            Login
          <input
              type="text"
              id="login"
              name="login"
              value={login}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="password">
            Mot de passe
          <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Connect me !</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  userRegister,
}, dispatch)


export default connect(null, mapDispatchToProps)(SignIn)