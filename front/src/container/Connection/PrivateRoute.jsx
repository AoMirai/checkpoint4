import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'


const PrivateRoute = ({ component: Component, token, ...propsRoute }) => (
  <Route
    {...propsRoute}
    render={props => (
      (token && token !== '')
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
          />
        )
    )}
  />
);

const mapStateToProps = (state) => {
  return {
    token: state.user.token
  }  
}

export default connect(mapStateToProps)(PrivateRoute);