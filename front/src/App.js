import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './container/PrivateRoute'
import Navbar from './container/Navbar';
import Home from './container/Home';
import Admin from './container/Admin';
import Visitor from './container/Visitor';
import SignIn from './container/SignIn'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/visitor" component={Visitor} />
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/signin" component={SignIn} />
      </Switch>

    </div>
  );
}

export default App;