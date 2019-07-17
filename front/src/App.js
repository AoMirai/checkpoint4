import React from 'react';
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './container/Connection/PrivateRoute'
import Navbar from './container/Navigation/Navbar';
import Home from './container/Visitor/Home';
import Admin from './container/Admin/Admin';
import AdminArtist from './container/Admin/AdminArtist';
import AdminShow from './container/Admin/AdminShow';
import AdminAct from './container/Admin/AdminAct'
import SignIn from './container/Connection/SignIn'
import SignOut from './container/Connection/SignOut'
import {
  NotificationContainer,
} from 'react-notifications';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute exact path="/admin" component={Admin}/>
        <PrivateRoute path="/admin/artist" component={AdminArtist}/>
        <PrivateRoute path="/admin/act" component={AdminAct}/>
        <PrivateRoute path="/admin/show" component={AdminShow}/>
        <PrivateRoute path="/admin/signout" component={SignOut}/>
      </Switch>
      <NotificationContainer/>
    </div>
  );
}

export default App;